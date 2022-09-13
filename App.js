import React, {useEffect, useState} from 'react';
import 'moment/locale/fr';
import {NavigationContainer} from '@react-navigation/native';
import NavigationTheme from './src/Navigations/NavigationTheme';
import TechnicianTabNavigator from './src/Navigations/TechnicianTabNavigator';
import TeacherTabNavigator from './src/Navigations/TeacherTabNavigator';
import LoginScreen from './src/Screens/LoginScreen/LoginScreenV2';
import storage from './src/Utils/asyncStorage';
import notificationListeners from './src/Utils/notificationListeners';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import color from './src/Config/color';

const App = () => {
  const [user, setUser] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const readData = async () => {
    try {
      const value = await storage.getItem('user');
      setUser(value);
      setHasLoaded(true);
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };
  useEffect(() => {
    setTimeout(() => {
      LottieSplashScreen.hide();
    }, 2000);
    readData();
    if (user) {
      const unsubscribe = notificationListeners();
      return unsubscribe;
    }
  }, [user]);
  return (
    <AlertNotificationRoot
      theme="light"
      colors={[
        {
          danger: color.primary,
          card: color.lightBlue,
          overlay: 'black',
          label: 'black',
          success: color.primary,
          warning: color.primary,
        },
      ]}>
      <NavigationContainer theme={NavigationTheme}>
        {hasLoaded &&
          (user ? (
            user.role === 'enseignant' ? (
              <TeacherTabNavigator />
            ) : (
              <TechnicianTabNavigator />
            )
          ) : (
            <LoginScreen setUser={setUser} />
          ))}
      </NavigationContainer>
    </AlertNotificationRoot>
  );
};
export default App;
