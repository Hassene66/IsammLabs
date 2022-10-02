import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';
import ClaimsList from '../Screens/ClaimsListTeacher/ClaimsList';
import ClaimsCard from '../Screens/ClaimsListTeacher/ClaimsCard';
import ClaimDetails from '../Screens/ClaimsListTeacher/ClaimDetails';
import ToConfirmClaims from '../Screens/Claims/to_confirm_claims/ToConfirmClaims';

const Stack = createNativeStackNavigator();
const ToConfirmClaimsNavigator = () => (
  <Stack.Navigator initialRouteName={routes.APPROVE_DECLINE}>
    <Stack.Screen
      name={routes.APPROVE_DECLINE}
      component={ToConfirmClaims}
      options={{
        title: 'Réclamations en attente',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name={routes.CLAIM_LIST}
      component={ClaimsList}
      options={{
        title: 'En attente de confirmation',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name={routes.CLAIM_CARD}
      component={ClaimsCard}
      options={{
        title: 'En attente de confirmation',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name={routes.CLAIM_DETAIL}
      component={ClaimDetails}
      options={{
        title: 'Détail réclamation',
      }}
    />
  </Stack.Navigator>
);

export default ToConfirmClaimsNavigator;
