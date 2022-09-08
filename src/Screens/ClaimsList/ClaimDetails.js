import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import color from '../../Config/color';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {AppForm, AppFormField, SubmitButton} from '../../Components/forms';
import moment from 'moment';
import axios from '../../Utils/axios';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import {useNavigation} from '@react-navigation/native';
import routes from '../../Navigations/routes';
import {ALERT_TYPE, Dialog, Root, Toast} from 'react-native-alert-notification';
import claimStatus from '../../Utils/claimStatus';
import Collapsible from 'react-native-collapsible';
import claimService from '../../Services/claimService';
import options, {lessOptions} from '../../Utils/claimOptions';
import ClaimStatusSwitchSelector from '../../Components/ClaimStatusSwitchSelector';
import claimOptions from '../../Utils/claimOptions';

const ClaimDetails = ({route}) => {
  const claimType = route?.params?.fromRoute;
  const initialSelectedSwitch =
    claimType === options[0].value ? options[0].value : options[1].value;
  console.log('initialSelectedSwitch: ', initialSelectedSwitch);
  const navigation = useNavigation();
  const {params} = route;
  const [loading, setLoading] = useState(false);
  const [showMoreContent, setShowMoreContent] = useState(false);
  const [selectedSwitch, setSelectedSwitch] = useState(initialSelectedSwitch);

  const handleSwitchChange = status => {
    setSelectedSwitch(status);
    if (status === claimStatus.NOT_RESOLVED) {
      setShowMoreContent(true);
    } else {
      setShowMoreContent(false);
    }
  };
  const handleSubmit = values => {
    setLoading(true);
    let additionalInfo = undefined;
    if (
      values.status === claimStatus.RESOLVED ||
      values.status === claimStatus.NOT_RESOLVED
    ) {
      additionalInfo = {isConfirmed: false};
    }
    claimService
      .updateClaimApi(params._id, {...values, ...additionalInfo})
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: routes.CLAIM_LIST,
            },
          ],
        });
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Succès',
          textBody: "L'opération a été soumise avec succès ",
          autoClose: 3000,
        });
      })
      .catch(err => {
        console.log('err: ', err);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erreur',
          textBody:
            "Un problème s'est produit pendant l'opération de mise à jour",
          autoClose: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Root
      theme="light"
      colors={[
        {
          danger: color.primary,
          card: color.lightBlue,
          overlay: 'black',
          label: 'black',
          success: color.primary,
          warning: color.primary,
        },
      ]}>
      <ScrollView>
        <AppForm
          initialValues={{
            reason: undefined,
            status: selectedSwitch,
          }}
          onSubmit={handleSubmit}>
          <MyActivityIndicator loading={loading}>
            <View style={styles.cardContainer}>
              <View style={styles.cardHeader}>
                <Ionicons
                  name="md-person-circle-sharp"
                  size={56}
                  color={color.light_green}
                  style={styles.icon}
                />
                <View style={styles.cardHeaderInfo}>
                  <Text style={styles.userInfo}>
                    {params?.createdBy?.fullname}
                  </Text>
                  <Text
                    style={{
                      color: '#B0B0B0',
                      fontWeight: '600',
                    }}>
                    {params?.createdBy?.email}
                  </Text>
                </View>
              </View>
              <View style={styles.cardBodyContainer}>
                <Text style={styles.Title}>{params.title}</Text>
                <Text style={styles.subTitle}>{params.description}</Text>
                <View style={styles.footerContainer}>
                  <View style={styles.section}>
                    <View style={styles.firstCol}>
                      <AntDesign
                        name="calendar"
                        size={22}
                        style={{marginRight: 10, color: color.primary}}
                      />
                      <Text style={styles.subTitle}>{`${moment(
                        params?.createdAt,
                      ).format('DD/MM/YYYY')} > ${moment(params?.createdAt)
                        .add(7, 'days')
                        .format('DD/MM/YYYY')} `}</Text>
                    </View>
                    <View style={styles.secondCol}>
                      <Ionicons
                        name="grid-outline"
                        size={20}
                        style={{marginRight: 10, color: color.primary}}
                      />
                      <Text style={styles.subTitle}>{params?.bloc?.label}</Text>
                    </View>
                  </View>
                  <View style={[styles.section, {marginTop: 10}]}>
                    <View style={styles.firstCol}>
                      <AntDesign
                        name="iconfontdesktop"
                        size={22}
                        style={{marginRight: 10, color: color.primary}}
                      />
                      <View style={{paddingRight: 50}}>
                        <Text style={styles.subTitle}>
                          {params?.computer?.label}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.secondCol}>
                      <SimpleLineIcons
                        name="location-pin"
                        size={20}
                        style={{marginRight: 10, color: color.primary}}
                      />
                      <Text style={styles.subTitle}>{params.labo?.label}</Text>
                    </View>
                  </View>
                  {(params.type === 'newSoftware' ||
                    params.type === 'updateSoftware') && (
                    <View style={[styles.section, {marginTop: 10}]}>
                      <View style={styles.firstCol}>
                        <AntDesign
                          name={
                            params.type === 'newSoftware' ? 'download' : 'sync'
                          }
                          size={params.type === 'newSoftware' ? 22 : 18}
                          style={{marginRight: 10, color: color.primary}}
                        />
                        <View style={{paddingRight: 50}}>
                          <Text style={styles.subTitle}>
                            {params.type === 'newSoftware'
                              ? params?.toAddSoftware?.name
                              : params?.toUpdateSoftware?.name}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.secondCol}>
                        <AntDesign
                          name="codesquareo"
                          size={20}
                          style={{marginRight: 10, color: color.primary}}
                        />
                        <Text style={styles.subTitle}>
                          {params.installedIn}
                        </Text>
                      </View>
                    </View>
                  )}
                  {params.type === 'hardware' && (
                    <View style={[styles.section, {marginTop: 10}]}>
                      <View style={styles.firstCol}>
                        <Octicons
                          name="dot-fill"
                          size={22}
                          style={{
                            marginRight: 10,
                            color:
                              params?.state === 'En marche' ? 'green' : 'red',
                          }}
                        />
                        <View style={{paddingRight: 50}}>
                          <Text style={styles.subTitle}>{params?.state}</Text>
                        </View>
                      </View>
                    </View>
                  )}
                  <View style={[styles.section, {flexDirection: 'column'}]}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: color.medium,
                        marginVertical: 7,
                      }}>
                      Votre progression :
                    </Text>
                    <ClaimStatusSwitchSelector
                      name="status"
                      getSelectedItem={handleSwitchChange}
                      switchOptons={
                        claimType === claimOptions[1].value
                          ? lessOptions
                          : undefined
                      }
                    />
                    <Collapsible collapsed={!showMoreContent}>
                      <View style={styles.formContainer}>
                        <AppFormField name="reason" placeholder="raison" />
                      </View>
                    </Collapsible>
                    <View style={styles.submitBtnMargin(showMoreContent)}>
                      <SubmitButton
                        title="Soumettre"
                        style={styles.SubmitButton}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </MyActivityIndicator>
        </AppForm>
      </ScrollView>
    </Root>
  );
};

export default ClaimDetails;

const styles = StyleSheet.create({
  cardHeader: {
    alignItems: 'center',
    padding: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  cardHeaderInfo: {
    color: color.medium,
    flex: 1,
    padding: 5,
  },
  userInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.dark_blue,
  },
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.dark_green,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 13,
    color: color.medium,
    lineHeight: 17,
    textAlign: 'justify',
    textAlignVertical: 'center',
  },
  cardBodyContainer: {backgroundColor: 'white', margin: 15},
  section: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  firstCol: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerContainer: {
    paddingVertical: 8,
  },
  ToggleBtn: {
    fontFamily: 'System',
    color: 'white',
    fontSize: 15,
    padding: 8,
  },
  formContainer: {
    // marginVertical: 5,
  },
  submitBtnMargin: showMore => ({marginTop: showMore ? 15 : 20}),
});
