import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import color from '../Config/color';

const PcCaractiresitics = ({item}) => {
  const {characteristics} = item;
  const availableSoftwares = item => {
    const arr = [];
    if (item?.windows?.length) arr.push('windows');
    if (item?.linux?.length) arr.push('linux');
    if (item?.macos?.length) arr.push('macos');
    return arr;
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcon
            color={color.lightGrey}
            name="ip-outline"
            size={23}
            style={{marginRight: 5}}
          />
          <Text style={[styles.textColor, styles.characteristicFont]}>
            {characteristics?.ip}
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Feather
            color={color.lightGrey}
            name="cpu"
            size={23}
            style={{marginRight: 5}}
          />
          <Text style={[styles.textColor, styles.characteristicFont]}>
            {characteristics?.cpu}
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcon
            color={color.lightGrey}
            name="expansion-card-variant"
            size={30}
            style={{marginRight: 3}}
          />
          <Text style={[styles.textColor, styles.characteristicFont]}>
            {characteristics?.gpu}
          </Text>
        </View>
      </View>
      <View style={{flex: 1, marginLeft: 20}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1,
          }}>
          <AntDesign
            color={color.lightGrey}
            name="codesquareo"
            size={23}
            style={{marginRight: 5}}
          />
          <Text
            style={[styles.textColor, styles.characteristicFont]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {availableSoftwares(item).map(software => `${software} ,`)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
          <FontAwesome
            color={color.lightGrey}
            name="memory"
            size={19}
            style={{marginRight: 5}}
          />
          <Text style={[styles.textColor, styles.characteristicFont]}>
            {characteristics?.ram}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <MaterialCommunityIcon
            color={color.lightGrey}
            name="harddisk"
            size={25}
            style={{marginRight: 4}}
          />
          <Text style={[styles.textColor, styles.characteristicFont]}>
            {characteristics?.storage}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PcCaractiresitics;

const styles = StyleSheet.create({
  characteristicFont: {fontWeight: '400', fontSize: 17},
  textColor: {
    color: color.medium,
  },
});
