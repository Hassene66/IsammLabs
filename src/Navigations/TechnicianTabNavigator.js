import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewClaimButton from './NewClaimButton';
import ToRepairListNavigator from './ToRepairListNavigator';
import routes from './routes';
import AddClaimNavigator from './AddClaimNavigator';
import AddNewPcNavigator from './AddNewPcNavigator';
import MyProfileScreen from '../Screens/MyProfileScreen/MyProfileScreen';
import TechnicienProfileNavigator from './TechnicienProfileNavigator';

const Tab = createBottomTabNavigator();

const TechnicianTabNavigator = () => (
  <Tab.Navigator screenOptions={{}}>
    <Tab.Screen
      name={routes.TO_REPAIR}
      component={ToRepairListNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({size, color}) => (
          <MaterialCommunityIcons name="wrench" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={routes.ADD_CLAIM}
      component={AddNewPcNavigator}
      options={({navigation}) => ({
        headerShown: false,
        tabBarButton: () => (
          <NewClaimButton
            onPress={() => navigation.navigate(routes.ADD_CLAIM)}
          />
        ),
      })}
    />
    <Tab.Screen
      name={routes.PROFILE}
      children={TechnicienProfileNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({size, color}) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TechnicianTabNavigator;
