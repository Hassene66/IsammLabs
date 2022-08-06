import {Text, View} from 'react-native';
import React from 'react';
import color from '../Config/color';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

const SoftwaresInstalled = ({item}) => {
  console.log(item);
  return (
    <View style={{flex: 1, backgroundColor: color.white}}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
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
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <FlatList
          data={item}
          renderItem={({item}) => (
            <View
              key={item?.id}
              style={{flexDirection: 'row', marginVertical: 5, width: 170}}>
              <Feather
                color="black"
                name="check"
                size={23}
                style={{marginRight: 5}}
              />
              <Text style={{fontWeight: '400', fontSize: 17}}>
                {item?.name}
              </Text>
            </View>
          )}
          keyExtractor={() => `${uuid.v4()}`}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
        />
      </ScrollView>
    </View>
  );
};

export default SoftwaresInstalled;
