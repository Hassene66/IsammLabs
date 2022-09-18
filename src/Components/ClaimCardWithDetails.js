import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import color from '../Config/color';
import {AppForm} from '../Components/forms';
import SeeMore from 'react-native-see-more-inline';
import moment from 'moment';
const ClaimsCardWithDetails = ({data}) => {
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
          <SeeMore
            numberOfLines={3}
            style={styles.subTitle}
            linkColor="#B0B0B0"
            linkPressedColor="#B0B0B0"
            seeMoreText="voir plus"
            seeLessText="voir moins">
            {data.description}
          </SeeMore>

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
            {(data.type === 'newSoftware' ||
              data.type === 'updateSoftware') && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View style={styles.firstCol}>
                  <AntDesign
                    name={data.type === 'newSoftware' ? 'download' : 'sync'}
                    size={data.type === 'newSoftware' ? 22 : 18}
                    style={{marginRight: 10, color: color.primary}}
                  />
                  <View style={{paddingRight: 50}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.subTitle}>
                      {data.type === 'newSoftware'
                        ? data?.toAddSoftware?.name
                        : data?.toUpdateSoftware?.name}
                    </Text>
                  </View>
                </View>
                <View style={styles.secondCol}>
                  <AntDesign
                    name="codesquareo"
                    size={20}
                    style={{marginRight: 10, color: color.primary}}
                  />
                  <Text style={styles.subTitle}>{data?.installedIn}</Text>
                </View>
              </View>
            )}
            {data.type === 'hardware' && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View style={styles.firstCol}>
                  <Octicons
                    name="dot-fill"
                    size={22}
                    style={{
                      marginRight: 10,
                      color: data?.state === 'En marche' ? 'green' : 'red',
                    }}
                  />
                  <View style={{paddingRight: 50}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.subTitle}>
                      {data?.state}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {data.reason && (
              <View
                style={{
                  marginTop: 10,
                  paddingRight: 50,
                }}>
                <Text style={styles.reason}>Raison :</Text>
                <SeeMore
                  numberOfLines={2}
                  style={styles.subTitle}
                  linkColor="#B0B0B0"
                  linkPressedColor="#B0B0B0"
                  seeMoreText="voir plus"
                  seeLessText="voir moins">
                  {data.reason}
                </SeeMore>
              </View>
            )}
          </View>
        </View>
      </View>
    </AppForm>
  );
};

export default ClaimsCardWithDetails;

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
    marginHorizontal: 10,
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
    marginTop: 10,
  },
  ToggleBtn: {
    fontFamily: 'Cairo-Bold',
    color: color.primary,
    fontSize: 15,
    padding: 8,
  },
  reason: {
    marginTop: 10,
    color: color.medium,
    fontSize: 16,
    fontWeight: '600',
  },
});
