import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import 'moment/locale/fr';
// import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/Navigations/AuthNavigator';
import NavigationTheme from './src/Navigations/NavigationTheme';
import TechnicianTabNavigator from './src/Navigations/TechnicianTabNavigator';
import HardwareTab from './src/Screens/AddClaimScreen/NewSoftwareForm';
import SoftwareClaimForm from './src/Screens/AddClaimScreen/SoftwareClaimForm';
import HardwareClaimForm from './src/Screens/AddClaimScreen/HardwareClaimForm';
import ClaimsList from './src/Screens/ClaimsList/ClaimsList';
import TeacherTabNavigator from './src/Navigations/TeacherTabNavigator';
import LabsInfoScreen from './src/Screens/LabsInfoScreen/LabsInfoScreen';
import AddClaimSecondStepScreen from './src/Screens/AddClaimScreen/AddClaimSecondStepScreen';
import LoginScreen from './src/Screens/LoginScreen/LoginScreenV2';
import getCurrentUser from './src/Utils/getAuthUser';
import storage from './src/Utils/asyncStorage';
import MyActivityIndicator from './src/Components/MyActivityIndicator';
import messaging from '@react-native-firebase/messaging';
import routes from './src/Navigations/routes';
import notificationListeners from './src/Utils/notificationListeners';
import {Root} from 'react-native-alert-notification';
import LottieSplashScreen from 'react-native-lottie-splash-screen';

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
    <Root theme="light">
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
    </Root>
  );
};
export default App;
