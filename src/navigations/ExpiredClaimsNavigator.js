import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';
import ClaimsList from '../Screens/ClaimsList/ClaimsList';
import ClaimsCard from '../Screens/ClaimsList/ClaimsCard';
const Stack = createNativeStackNavigator();
const ExpiredClaimsNavigator = () => (
  <Stack.Navigator initialRouteName={routes.CLAIM_LIST}>
    <Stack.Screen
      name={routes.CLAIM_LIST}
      component={ClaimsList}
      options={{
        title: 'Réclamations expirées',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name={routes.CLAIM_CARD}
      component={ClaimsCard}
      options={{
        title: 'Réclamations expirées',
        headerTitleAlign: 'center',
      }}
    />
  </Stack.Navigator>
);

export default ExpiredClaimsNavigator;
