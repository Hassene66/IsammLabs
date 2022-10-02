import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';
import ProcessedClaims from '../Screens/Claims/processed_claims/ProcessedClaims';
import TechnicienProfile from '../Screens/MyProfileScreen/TechnicienProfile';
import Notification from '../Screens/TechnicienNotification/ListNotification';
import InProgressListNavigator from './InProgressListNavigator';
import ExpiredClaimsNavigator from './ExpiredClaimsNavigator';
const Stack = createNativeStackNavigator();
const TechnicienProfileNavigator = () => (
  <Stack.Navigator initialRouteName={routes.TECHNICIEN_PROFILE}>
    <Stack.Screen
      name={routes.TECHNICIEN_PROFILE}
      component={TechnicienProfile}
      options={{
        title: 'Mon profile',
      }}
    />
    <Stack.Screen
      name={routes.PROCESSED_CLAIMS}
      component={ProcessedClaims}
      options={{
        title: 'Réclamations traitées',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name={routes.IN_PROGRESS_CLAIMS}
      component={InProgressListNavigator}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={routes.EXPIRED_CLAIMS}
      component={ExpiredClaimsNavigator}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={routes.WAITING_FOR_APPROVAL}
      component={ProcessedClaims}
      options={{
        title: 'Réclamations en attente',
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
