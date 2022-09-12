import {useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export default NotificationListeners = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage?.data?.routeName) {
      //   navigation.navigate(remoteMessage.data.routeName);
    }
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
      }
    });
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Toast.show({
      type: ALERT_TYPE.WARNING,
      title: remoteMessage.notification.title,
      textBody: remoteMessage.notification.body,
      autoClose: 4000,
    });
  });

  return unsubscribe;
};
