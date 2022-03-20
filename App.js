import {StyleSheet} from 'react-native';
import React from 'react';
import LoginScreen from './src/Screens/LoginScreen/LoginScreen';
import ForgotScreen from './src/Screens/ForgotPasswordScreen/ForgotPasswordScreen';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/Navigations/AuthNavigator';
import NavigationTheme from './src/Navigations/NavigationTheme';
const App = () => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
