import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';
import ProcessedClaims from '../Screens/Claims/ProcessedClaims';
import MyProfileScreen from '../Screens/MyProfileScreen/MyProfileScreen';
import Notification from '../Screens/TechnicienNotification/ListNotification';
const Stack = createNativeStackNavigator();
const TechnicienProfileNavigator = () => (
  <Stack.Navigator initialRouteName={routes.PROFILE}>
    <Stack.Screen name={routes.PROFILE} component={MyProfileScreen} />
    <Stack.Screen
      name={routes.PROCESSED_CLAIMS}
      component={ProcessedClaims}
      options={{
        title: 'Réclamation traitées',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name={routes.TECHNICIEN_NOTIFICATION}
      component={Notification}
      options={{title: 'Mes notifications'}}
    />
  </Stack.Navigator>
);

export default TechnicienProfileNavigator;
