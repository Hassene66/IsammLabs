import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/Navigations/AuthNavigator';
import NavigationTheme from './src/Navigations/NavigationTheme';
import TeacherTabNavigator from './src/Navigations/TeacherTabNavigator';
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 2000);
  }, []);
  return (
    <NavigationContainer theme={NavigationTheme}>
      <TeacherTabNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
