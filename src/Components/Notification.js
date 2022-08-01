import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import moment from 'moment';

const Notification = ({data}) => {
  console.log('data: ', data);
  return (
    <View style={styles.container}>
      <View style={styles.firstRaw}>
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.dateTime}>
          {moment(data?.createdAt).format('LT')}
        </Text>
      </View>
      <Text numberOfLines={3} ellipsizeMode="tail" style={styles.description}>
        {data?.description}
      </Text>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    minHeight: 120,
    backgroundColor: 'white',
    padding: 15,
    overflow: 'hidden',
  },
  firstRaw: {flexDirection: 'row', alignItems: 'center', marginBottom: 5},
  title: {
    flex: 1,
    justifyContent: 'flex-end',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#636363',
  },
  dateTime: {
    color: '#ACACAC',
    textAlign: 'right',
    fontWeight: '600',
  },
  description: {color: '#707072'},
});
