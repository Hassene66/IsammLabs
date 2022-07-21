import React from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import color from '../../Config/color';
import NewSoftwareForm from './NewSoftwareForm';
import SoftwareUpdateForm from './SoftwareUpdateForm';

const SoftwareClaimForm = ({values}) => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.container}>
      <Tab.Navigator
        swipeVelocityImpact={0.4}
        sceneContainerStyle={{
          backgroundColor: 'transparent',
        }}
        backBehavior="history"
        screenOptions={styles.screenOptions}
        initialRouteName="HardwareClaim">
        <Tab.Screen
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome name="plus" size={23} color={color} />
            ),
          }}
          name="Nouveau logiciel"
          children={() => <NewSoftwareForm values={values} />}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome name="refresh" size={23} color={color} />
            ),
          }}
          name="Mise à jour"
          children={() => <SoftwareUpdateForm />}
        />
      </Tab.Navigator>
    </View>
  );
};

export default SoftwareClaimForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 8,
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 20,
  },
  screenOptions: {
    tabBarAllowFontScaling: true,
    tabBarPressColor: color.primary,
    tabBarItemStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    tabBarLabelStyle: {
      fontFamily: 'Cairo-SemiBold',
      fontWeight: 'bold',
    },
  },
});
