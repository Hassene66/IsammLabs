import React from 'react';
import {Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../Config/color';

const PcCaractiresitics = ({item}) => {
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
          <FontAwesome
            color={color.lightGrey}
            name="download"
            size={23}
            style={{marginRight: 5}}
          />
          <Text style={{fontWeight: '400', fontSize: 17}}>
            {item.caracteristic.ip}
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Feather
            color={color.lightGrey}
            name="cpu"
            size={23}
            style={{marginRight: 5}}
          />
          <Text style={{fontWeight: '400', fontSize: 17}}>
            {item.caracteristic.processor}
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcon
            color={color.lightGrey}
            name="expansion-card-variant"
            size={30}
            style={{marginRight: 3}}
          />
          <Text style={{fontWeight: '400', fontSize: 17}}>
            {item.caracteristic.graphicCard}
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
          <FontAwesome
            color={color.lightGrey}
            name="windows"
            size={23}
            style={{marginRight: 5}}
          />
          <Text style={{fontWeight: '400', fontSize: 17}}>
            {item.caracteristic.os}
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
          <Text style={{fontWeight: '400', fontSize: 17}}>
            {item.caracteristic.ram} GB
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
          <Text style={{fontWeight: '400', fontSize: 17}}>
            {item.caracteristic.storage}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PcCaractiresitics;
