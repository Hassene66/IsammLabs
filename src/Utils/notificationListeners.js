import {useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export default NotificationListeners = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    if (remoteMessage?.data?.routeName) {
      //   navigation.navigate(remoteMessage.data.routeName);
    }
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        if (remoteMessage?.data?.routeName) {
          //   navigation.navigate(remoteMessage.data.routeName);
        }
      }
    });
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log(JSON.stringify(remoteMessage));
    Toast.show({
      type: ALERT_TYPE.WARNING,
      title: remoteMessage.notification.title,
      textBody: remoteMessage.notification.body,
      autoClose: 4000,
    });
    if (remoteMessage?.data?.routeName) {
      // useNavigation.navigate(remoteMessage.data.routeName);
    }
  });

  return unsubscribe;
};
