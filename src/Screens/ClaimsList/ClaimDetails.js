import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import color from '../../Config/color';
import User from '../../assets/userImage.png';
import {AppForm, SubmitButton} from '../../Components/forms';
import moment from 'moment';
import axios from '../../Utils/axios';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import {useNavigation} from '@react-navigation/native';
import routes from '../../Navigations/routes';

const ClaimsCard = ({route}) => {
  const navigation = useNavigation();
  const {params} = route;
  const [loading, setLoading] = useState(false);
  const MarkResolved = () => {
    setLoading(true);
    axios
      .put('/api/claim/' + params._id, {status: 'resolved'})
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        setLoading(false);
        navigation.navigate(routes.CLAIM_LIST);
      });
  };
  const markNotResolved = () => {
    setLoading(true);
    axios
      .put('/api/claim/' + params._id, {status: 'not resolved'})
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        setLoading(false);
        navigation.navigate(routes.CLAIM_LIST);
      });
  };
  return (
    <AppForm
      initialValues={{
        status: 'unprocessed',
      }}
      onSubmit={() => {}}>
      <MyActivityIndicator loading={loading}>
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Image
              style={{width: 50, height: 50, marginRight: 5}}
              source={User}
            />
            <View style={styles.cardHeaderInfo}>
              <Text style={styles.userInfo}>{params.createdBy?.fullname}</Text>
              <Text
                style={{
                  color: '#B0B0B0',
                  fontWeight: '600',
                }}>
                {params.createdBy?.email}
              </Text>
            </View>
          </View>
          <View style={styles.cardBodyContainer}>
            <Text style={styles.Title}>Réclamation :</Text>
            <Text style={styles.subTitle}>{params.title}</Text>
            <Text style={styles.Title}>Détail :</Text>
            <Text style={styles.subTitle}>{params.description}</Text>
            <View style={styles.footerContainer}>
              <View style={styles.claimDetails}>
                <View style={styles.firstCol}>
                  <FontAwesome
                    name="calendar-o"
                    size={22}
                    style={{marginHorizontal: 10, color: color.primary}}
                  />
                  <Text style={styles.subTitle}>{`${moment(
                    params?.createdAt,
                  ).format('DD/MM/YYYY')} > ${moment(params?.createdAt)
                    .add(7, 'days')
                    .format('DD/MM/YYYY')} `}</Text>
                </View>
                <View style={styles.secondCol}>
                  <FontAwesome
                    name="th-large"
                    size={22}
                    style={{marginHorizontal: 10, color: color.primary}}
                  />
                  <Text style={styles.subTitle}>{params?.bloc?.label}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View style={styles.firstCol}>
                  <FontAwesome
                    name="desktop"
                    size={22}
                    style={{marginHorizontal: 10, color: color.primary}}
                  />
                  <View style={{paddingRight: 50}}>
                    <Text style={styles.subTitle}>
                      {params?.computer?.label}
                    </Text>
                  </View>
                </View>
                <View style={[styles.secondCol, {marginLeft: 15}]}>
                  <FontAwesome
                    name="map-marker"
                    size={22}
                    style={{marginHorizontal: 10, color: color.primary}}
                  />
                  <Text style={styles.subTitle}>{params.labo?.label}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1, paddingHorizontal: 10}}>
                  <SubmitButton
                    onSubmit={markNotResolved}
                    title="Non Résolu"
                    style={{
                      padding: 10,
                      backgroundColor: color.lighter,
                      borderWidth: 1,
                      borderColor: color.medium,
                    }}
                    textStyle={{fontSize: 15, color: color.medium}}
                  />
                </View>
                <View style={{flex: 1, paddingHorizontal: 10}}>
                  <SubmitButton
                    onSubmit={MarkResolved}
                    title="Résolu"
                    style={{padding: 11}}
                    textStyle={{fontSize: 15}}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </MyActivityIndicator>
    </AppForm>
  );
};

export default ClaimsCard;

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 20,
  },

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
  userInfo: {fontSize: 18, fontWeight: 'bold', color: color.medium},
  Title: {fontSize: 17, fontWeight: 'bold', color: 'black'},
  subTitle: {fontSize: 13, color: 'black'},
  ToggleBtnContainer: {
    backgroundColor: color.primary,
    borderRadius: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 8,
  },
  cardBodyContainer: {backgroundColor: 'white', margin: 15},
  claimDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
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
    fontFamily: 'Cairo-Bold',
    color: 'white',
    fontSize: 15,
    padding: 8,
  },
});
