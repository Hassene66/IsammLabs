import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ReaclamationNavigation from '../../Navigations/ReaclamationNavigation';
import NewSoftware from './NewSoftware';
import UpdateSoftware from './UpdateSoftware';

const SoftwareRecalamation = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={[styles.container, styles.text]}>
      <>
        <Tab.Navigator initialRouteName="Nouveau logiciel">
          <Tab.Screen name="Nouveau logiciel" component={NewSoftware} />
          <Tab.Screen name="Mise à jour" component={UpdateSoftware} />
        </Tab.Navigator>
      </>
    </View>
  );
};

export default SoftwareRecalamation;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'grey',
    overflow: 'hidden',
    backgroundColor: 'white',
    minHeight: 350,
  },
});
