import {Text, View} from 'react-native';
import React from 'react';
import color from '../../Config/color';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const SoftwaresInstalled = () => {
  return (
    <View style={{flex: 1, backgroundColor: color.white}}>
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
          <Entypo
            color={color.primary}
            name="install"
            size={23}
            style={{marginRight: 5}}
          />
          <Text style={{fontWeight: '400', fontSize: 17}}>
            Logiciel installé :
          </Text>
        </View>
      </View>
      {/*  fisrt row */}
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
            color="black"
            name="check"
            size={23}
            style={{marginRight: 5}}
          />
          <Text style={{fontWeight: '400', fontSize: 17}}>Java</Text>
        </View>
        <View
          style={{
            marginLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Feather
            color="black"
            name="check"
            size={23}
            style={{marginRight: 5}}
          />
          <Text style={{fontWeight: '400', fontSize: 17}}>Python</Text>
        </View>
      </View>
    </View>
  );
};

export default SoftwaresInstalled;
