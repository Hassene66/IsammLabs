import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import React from 'react';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import color from '../Config/color';

const Notification = ({data, handleDelete = () => {}}) => {
  const DeleteAction = () => {
    return (
      <TouchableOpacity onPress={() => handleDelete(data._id)}>
        <View style={styles.rightAction}>
          <Icon
            name="trash-o"
            size={25}
            color="white"
            style={styles.actionText}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={DeleteAction}>
        <View style={styles.container}>
          <View style={styles.firstRaw}>
            <Text style={styles.title}>{data?.title}</Text>
            <Text style={styles.dateTime}>
              {moment(data?.datetime).isSame(
                momentTimezone().tz('Africa/Tunis').add(1, 'hours'),
                'days',
              )
                ? moment(data?.createdAt).fromNow()
                : moment(data?.createdAt).locale('fr').calendar()}
            </Text>
          </View>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.description}>
            {data?.description}
          </Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    minHeight: 95,
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

  rightAction: {
    backgroundColor: color.red,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    padding: 20,
  },
});
