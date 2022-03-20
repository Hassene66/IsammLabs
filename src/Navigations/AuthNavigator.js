import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen/ForgotPasswordScreen';
const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({});
