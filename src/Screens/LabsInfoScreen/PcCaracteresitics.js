import React from 'react';
import {Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../Config/color';

const PcCaractiresitics = ({item}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/*  first row */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 19,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 0.9,
          }}>
          <FontAwesome
            color={color.primary}
            name="download"
            size={23}
            style={{marginRight: 5}}
          />
          <Text style={{fontWeight: '400', fontSize: 17}}>
            {item.caracteristic.ip}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 18,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesome
            color={color.primary}
            name="windows"
            size={23}
            style={{marginRight: 5}}
          />
          <Text style={{fontWeight: '400', fontSize: 17}}>
            {item.caracteristic.os}
          </Text>
        </View>
      </View>
      {/*  second row */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 18,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 0.7,
            marginRight: 17,
          }}>
          <Feather
            color={color.primary}
            name="cpu"
            size={23}
            style={{marginRight: 5}}
          />
          <Text style={{fontWeight: '400', fontSize: 17}}>
            {item.caracteristic.processor}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesome
            color={color.primary}
            name="memory"
            size={19}
            style={{marginRight: 5}}
          />
          <Text style={{fontWeight: '400', fontSize: 17}}>
            {item.caracteristic.ram} GB
          </Text>
        </View>
      </View>
      {/*  third row */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 13,
        }}>
        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 0.7,
            marginRight: 15,
          }}>
          <MaterialCommunityIcon
            color={color.primary}
            name="expansion-card-variant"
            size={34}
            style={{marginRight: 3}}
          />
          <Text style={{fontWeight: '400', fontSize: 17}}>
            {item.caracteristic.graphicCard}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcon
            color={color.primary}
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
