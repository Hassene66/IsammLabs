import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewClaimButton from './NewClaimButton';
import routes from './routes';
import AddClaimNavigator from './AddClaimNavigator';
import MyProfileScreen from '../Screens/MyProfileScreen/MyProfileScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import LabsInfoScreen from '../Screens/LabsInfoScreen/LabsInfoScreen';
const Tab = createBottomTabNavigator();
const TeacherTabNavigator = () => (
  <Tab.Navigator screenOptions={{}}>
    <Tab.Screen
      name={routes.ACCEUIL}
      component={HomeScreen}
      options={{
        tabBarIcon: ({size, color}) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name={routes.ADD_CLAIM}
      component={AddClaimNavigator}
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
      children={() => <MyProfileScreen />}
      options={{
        tabBarIcon: ({size, color}) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TeacherTabNavigator;
