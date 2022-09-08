import {View} from 'react-native';
import React from 'react';
import SoftwareClaimForm from './SoftwareClaimForm';
import HardwareReclamation from './HardwareClaimForm';
import CustomTopTabNavigator from '../../Navigations/CustomTopTabNavigator';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Root} from 'react-native-alert-notification';
import color from '../../Config/color';

const AddClaimSecondStepScreen = ({route}) => {
  const {values} = route.params;

  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={{flex: 1}}>
      <Root
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
        <Tab.Navigator
          tabBar={props => (
            <CustomTopTabNavigator
              {...props}
              PagesName={['Logiciel', 'Matériel ']}
            />
          )}
          screenOptions={{
            showLabel: false,
          }}
          swipeVelocityImpact={0.2}
          sceneContainerStyle={{
            backgroundColor: 'trasnparent',
          }}
          backBehavior="history"
          initialRouteName="SoftwareRecalamation">
          <Tab.Screen
            name="SoftwareReclamation"
            children={() => <SoftwareClaimForm values={values} />}
          />
          <Tab.Screen
            name="HardwareReclamation"
            children={() => <HardwareReclamation values={values} />}
          />
        </Tab.Navigator>
      </Root>
    </View>
  );
};

export default AddClaimSecondStepScreen;
