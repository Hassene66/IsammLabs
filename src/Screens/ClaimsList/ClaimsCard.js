import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import color from '../../Config/color';
import Collapsible from 'react-native-collapsible';
import User from '../../assets/userImage.png';
import {useNavigation} from '@react-navigation/native';
const ClaimsCard = ({data}) => {
  const navigation = useNavigation();
  const [showMoreContent, setShowMoreContent] = useState(false);
  return (
    <View style={styles.cardContainer}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Claim Details', data);
        }}>
        <View style={styles.cardHeader}>
          <Image
            style={{width: 50, height: 50, marginRight: 5}}
            source={User}
          />
          <View style={styles.cardHeaderInfo}>
            <Text style={styles.userInfo}>{data.teacher}</Text>
            <Text
              style={{
                color: '#B0B0B0',
                fontWeight: '600',
              }}>
              {data.email}
            </Text>
          </View>
          <FontAwesome
            name="chevron-circle-right"
            size={30}
            style={{marginRight: 10, color: color.light}}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.cardBodyContainer}>
        <Text style={styles.Title}>Réclamation :</Text>
        <Text style={styles.subTitle}>{data.claimTitle}</Text>
        <Text style={styles.Title}>Détail :</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.subTitle}>
          {data.claimDetails}
        </Text>
        <Collapsible collapsed={!showMoreContent}>
          <View style={styles.footerContainer}>
            <View style={styles.claimDetails}>
              <View style={styles.firstCol}>
                <FontAwesome
                  name="calendar-o"
                  size={22}
                  style={{marginHorizontal: 10, color: color.primary}}
                />
                <Text
                  style={
                    styles.subTitle
                  }>{`${data.startingDate} > ${data.endingDate} `}</Text>
              </View>
              <View style={styles.secondCol}>
                <FontAwesome
                  name="th-large"
                  size={22}
                  style={{marginHorizontal: 10, color: color.primary}}
                />
                <Text style={styles.subTitle}>{data.bloc}</Text>
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
                <FontAwesome
                  name="desktop"
                  size={22}
                  style={{marginHorizontal: 10, color: color.primary}}
                />
                <View style={{paddingRight: 50}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.subTitle}>
                    {data.pc.map(item => `${item}, `)}
                  </Text>
                </View>
              </View>
              <View style={[styles.secondCol, {marginLeft: 15}]}>
                <FontAwesome
                  name="map-marker"
                  size={22}
                  style={{marginHorizontal: 10, color: color.primary}}
                />
                <Text style={styles.subTitle}>{data.labo}</Text>
              </View>
            </View>
          </View>
        </Collapsible>
        <TouchableWithoutFeedback
          onPress={() => setShowMoreContent(prev => !prev)}>
          <View style={styles.ToggleBtnContainer}>
            <Text style={styles.ToggleBtn}>
              {showMoreContent ? '▲  Moins de détails' : '▼ Plus de détails'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
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
  footerContainer: {
    flex: 1,
    paddingVertical: 8,
  },
  ToggleBtn: {
    fontFamily: 'Cairo-Bold',
    color: 'white',
    fontSize: 15,
    padding: 8,
  },
});
