import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import color from '../Config/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

const LabelHeader = ({label}) =>
  label && (
    <View style={{flexDirection: 'row', marginVertical: 5}}>
      <Icon name={label} size={20} color={color.medium} style={styles.icon} />
      <Text style={{fontWeight: '400', fontSize: 17, color: color.medium}}>
        {label + ' :'}
      </Text>
    </View>
  );
const SoftwaresInstalled = ({item}) => {
  return (
    <View style={{flex: 1, backgroundColor: color.white}}>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}></View>
        {/*  fisrt row */}
        <FlatList
          data={item?.windows}
          renderItem={({item}) => (
            <View
              key={item?._id}
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                width: 170,
                alignItems: 'center',
              }}>
              <Octicons
                color={color.green}
                name="dot-fill"
                size={15}
                style={{marginRight: 5}}
              />
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 17,
                  color: color.green,
                }}>
                {item?.name}
              </Text>
            </View>
          )}
          listKey={() => `${uuid.v4()}`}
          keyExtractor={() => `${uuid.v4()}`}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={
            item?.windows?.length && (
              <LabelHeader label={item?.windows && 'windows'} />
            )
          }
        />
        <FlatList
          data={item?.linux}
          renderItem={({item}) => (
            <View
              key={item?._id}
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                width: 170,
                alignItems: 'center',
              }}>
              <Octicons
                color={color.green}
                name="dot-fill"
                size={15}
                style={{marginRight: 5}}
              />
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 17,
                  color: color.green,
                }}>
                {item?.name}
              </Text>
            </View>
          )}
          listKey={() => `${uuid.v4()}`}
          keyExtractor={() => `${uuid.v4()}`}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={
            item?.linux?.length && (
              <LabelHeader label={item?.linux && 'linux'} />
            )
          }
        />
        <FlatList
          data={item?.macos}
          renderItem={({item}) => (
            <View
              key={item?._id}
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                width: 170,
                alignItems: 'center',
              }}>
              <Octicons
                color={color.green}
                name="dot-fill"
                size={15}
                style={{marginRight: 5}}
              />
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 17,
                  color: color.green,
                }}>
                {item?.name}
              </Text>
            </View>
          )}
          listKey={() => `${uuid.v4()}`}
          keyExtractor={() => `${uuid.v4()}`}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={
            item?.macos?.length && (
              <LabelHeader label={item?.maxos && 'macos'} />
            )
          }
        />
      </ScrollView>
    </View>
  );
};

export default SoftwaresInstalled;

const styles = StyleSheet.create({
  icon: {
    marginRight: 7,
  },
});
