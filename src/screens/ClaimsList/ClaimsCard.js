import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import color from '../../Config/color';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import routes from '../../Navigations/routes';
import {AppForm, SubmitButton} from '../../Components/forms';
const ClaimsCard = ({data, pressable = true}) => {
  const navigation = useNavigation();
  return (
    <AppForm
      initialValues={{
        status: 'unprocessed',
      }}
      onSubmit={() => {}}>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Ionicons
            name="md-person-circle-sharp"
            size={60}
            color={color.light_green}
            style={styles.icon}
          />
          <View style={styles.cardHeaderInfo}>
            <Text style={styles.userInfo}>{data?.createdBy?.fullname}</Text>
            <Text
              style={{
                color: '#B0B0B0',
                fontWeight: '600',
              }}>
              {data?.createdBy?.email}
            </Text>
          </View>
        </View>
        <View style={styles.cardBodyContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.Title}>
            {data.title}
          </Text>
          <Text numberOfLines={3} ellipsizeMode="tail" style={styles.subTitle}>
            {data.description}
          </Text>
          <View style={styles.footerContainer}>
            <View style={styles.claimDetails}>
              <View style={styles.firstCol}>
                <AntDesign
                  name="calendar"
                  size={22}
                  style={{marginRight: 10, color: color.primary}}
                />
                <Text style={styles.subTitle}>{`${moment(
                  data?.createdAt,
                ).format('DD/MM/YYYY')} > ${moment(data?.createdAt)
                  .add(7, 'days')
                  .format('DD/MM/YYYY')} `}</Text>
              </View>
              <View style={styles.secondCol}>
                <Ionicons
                  name="grid-outline"
                  size={20}
                  style={{marginRight: 10, color: color.primary}}
                />
                <Text style={styles.subTitle}>{data?.bloc?.label}</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View style={styles.firstCol}>
                <AntDesign
                  name="iconfontdesktop"
                  size={22}
                  style={{marginRight: 10, color: color.primary}}
                />
                <View style={{paddingRight: 50}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.subTitle}>
                    {data?.computer?.label}
                  </Text>
                </View>
              </View>
              <View style={styles.secondCol}>
                <SimpleLineIcons
                  name="location-pin"
                  size={20}
                  style={{marginRight: 10, color: color.primary}}
                />
                <Text style={styles.subTitle}>{data?.labo?.label}</Text>
              </View>
            </View>
            {pressable && (
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <SubmitButton
                  onSubmit={
                    pressable
                      ? () => {
                          navigation.navigate(routes.CLAIM_DETAIL, data);
                        }
                      : () => {}
                  }
                  title="Détail"
                  style={{padding: 10, paddingHorizontal: 30}}
                  textStyle={{fontSize: 15}}
                />
              </View>
            )}
          </View>
        </View>
      </View>
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

    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 12,
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
  cardBodyContainer: {backgroundColor: 'white', margin: 15, marginTop: 0},
  claimDetails: {
    flex: 1,
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
  thirdCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1,
    paddingVertical: 8,
  },
  ToggleBtn: {
    fontFamily: 'Cairo-Bold',
    color: color.primary,
    fontSize: 15,
    padding: 8,
  },
});
