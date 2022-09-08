import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import PcCaractiresitics from './PcCaracteresitics';
import SoftwaresInstalled from './SoftwaresInstalled';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../Config/color';

const CardItem = ({item, block}) => {
  console.log('item: ', item);

  const [showCaracteristic, setShowCaracteristic] = useState(true);
  const handleShowCaracteristic = () => {
    setShowCaracteristic(true);
  };
  const handleShowSoftwares = () => {
    setShowCaracteristic(false);
  };
  return (
    <View style={{margin: 15, alignItems: 'center'}}>
      <View
        // the card view
        style={styles.card}>
        {/* first row */}
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.9}}>
            <Text style={[styles.textColor, styles.mainText]}>
              {item.label}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={styles.pcStatus(item)} />
            <View>
              <Text style={styles.textColor}>
                {item.isWorking ? 'En marche' : 'En panne'}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginVertical: 10,
          }}>
          <TouchableWithoutFeedback onPress={handleShowCaracteristic}>
            <View style={styles.btnStyle(!showCaracteristic)}>
              <Text style={styles.selectBtnFontStyle(!showCaracteristic)}>
                Caractéristiques
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleShowSoftwares}>
            <View style={styles.btnStyle(showCaracteristic)}>
              <Text style={styles.selectBtnFontStyle(showCaracteristic)}>
                Logiciel installé
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {showCaracteristic ? (
          <PcCaractiresitics item={item} />
        ) : (
          <SoftwaresInstalled item={item} />
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
    backgroundColor: !caracteristic ? color.primary : color.light,
    marginRight: 10,
  }),
  selectBtnFontStyle: caracteristic => ({
    padding: 9,
    fontWeight: '600',
    fontSize: 15,
    color: caracteristic ? color.black : color.white,
  }),
  iconStyle: {fontWeight: '400', fontSize: 17},
  pcStatus: item => ({
    backgroundColor: item.isWorking ? 'green' : 'red',
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 6,
  }),
  mainText: {
    fontWeight: '600',
    fontFamily: 'System',
    fontSize: 24,
  },
  card: {
    overflow: 'hidden',
    backgroundColor: 'white',
    width: '100%',
    minHeight: 250,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 10,
    padding: 10,
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
  },
  Status: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  firstRow: {
    flexDirection: 'row',
  },
  textColor: {
    color: color.medium,
  },
});
