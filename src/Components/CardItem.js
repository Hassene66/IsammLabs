import React, {useState} from 'react';
import {StyleSheet, Text, Dimensions, View, Platform} from 'react-native';
import PcCaractiresitics from './PcCaracteresitics';
import SoftwaresInstalled from './SoftwaresInstalled';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import color from '../Config/color';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const CardItem = ({item, block}) => {
  console.log(item, block);
  const [showCaracteristic, setShowCaracteristic] = useState(true);
  const handleShowCaracteristic = () => {
    setShowCaracteristic(true);
  };
  const handleShowSoftwares = () => {
    setShowCaracteristic(false);
  };
  return (
    <View style={{marginVertical: 15, alignItems: 'center'}}>
      <View
        // the card view
        style={styles.card}>
        {/* first row */}
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.9}}>
            <Text style={styles.mainText}>{item.label}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={styles.pcStatus(item)} />
            <View>
              <Text>{item.isWorking ? 'En marche' : 'En panne'}</Text>
            </View>
          </View>
        </View>
        {/* second row */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 0.8,
            }}>
            <MaterialCommunityIcons
              color={color.primary}
              name="view-grid"
              size={24}
              style={{marginRight: 5}}
            />
            <Text style={styles.iconStyle}>{block}</Text>
          </View>
          <View
            style={{
              marginLeft: 44,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Entypo
              color={color.primary}
              name="location"
              size={21}
              style={{marginRight: 6}}
            />
            <Text style={styles.iconStyle}>{item?.label}</Text>
          </View>
        </View>
        {/* third row  */}
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}>
          <TouchableWithoutFeedback
            onPress={handleShowCaracteristic}
            style={{
              flexWrap: 'wrap',
              borderRadius: 8,
              marginRight: 8,
              backgroundColor: showCaracteristic
                ? color.primary
                : color.lightRed,
            }}>
            <Text
              style={{
                padding: 9,
                fontWeight: '600',
                fontSize: 15,
                color: !showCaracteristic ? color.black : color.white,
              }}>
              caractéristique
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleShowSoftwares}>
            <View style={styles.btnStyle(showCaracteristic)}>
              <Text style={styles.selectBtnFontStyle(showCaracteristic)}>
                Logiciel installé
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {showCaracteristic && <PcCaractiresitics item={item} />}
        {!showCaracteristic && (
          <SoftwaresInstalled item={item?.softwareInstalled} />
        )}
      </View>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  btnStyle: caracteristic => ({
    flexWrap: 'wrap',
    borderRadius: 8,
    backgroundColor: !caracteristic ? color.primary : color.lightRed,
  }),
  selectBtnFontStyle: caracteristic => ({
    padding: 9,
    fontWeight: '600',
    fontSize: 15,
    color: caracteristic ? color.black : color.white,
  }),
  iconStyle: {fontWeight: '400', fontSize: 17},
  pcStatus: item => ({
    backgroundColor: item.isWorking ? 'green' : color.primary,
    width: 14,
    height: '50%',
    borderRadius: 40,
    marginRight: 6,
  }),
  mainText: {
    fontWeight: '600',
    fontFamily: 'System',
    fontSize: 24,
  },
  card: {
    backgroundColor: 'white',
    width: Math.floor(Dimensions.get('window').width - 36),
    minHeight: 300,
    borderRadius: 15,
    shadowColor: '#171717',
    ...Platform.select({
      ios: {
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        padding: 18,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  text: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '500',
    backgroundColor: 'dodgerblue',
  },
  ColumnOne: {
    flexDirection: 'row',
    backgroundColor: 'gold',
    justifyContent: 'flex-end',
  },
  ColumnTwo: {
    flexDirection: 'row',
    backgroundColor: 'tomato',
  },
  Status: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  firstRow: {
    flexDirection: 'row',
  },
});
