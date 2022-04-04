import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewClaimButton from './NewClaimButton';
import routes from './routes';
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
      }}
    />
    <Tab.Screen
      name={routes.ADD_CLAIM}
      component={HomeScreen}
      options={({navigation}) => ({
        tabBarButton: () => (
          <NewClaimButton onPress={() => navigation.navigate('account')} />
        ),
        tabBarIcon: ({size, color}) => (
          <MaterialCommunityIcons
            name="plus-circle"
            size={size}
            color={color}
          />
        ),
      })}
    />
    <Tab.Screen
      name={routes.PROFILE}
      component={HomeScreen}
      options={{
        tabBarIcon: ({size, color}) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TeacherTabNavigator;
