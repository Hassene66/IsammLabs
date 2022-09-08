import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';
import ClaimsList from '../Screens/ClaimsList/ClaimsList';
import ClaimDetails from '../Screens/ClaimsList/ClaimDetails';
import ClaimsCard from '../Screens/ClaimsList/ClaimsCard';
import claimOptions from '../Utils/claimOptions';
const Stack = createNativeStackNavigator();
const ToRepairListNavigator = () => (
  <Stack.Navigator initialRouteName={routes.CLAIM_LIST}>
    <Stack.Screen
      name={routes.CLAIM_LIST}
      component={ClaimsList}
      initialParams={{fromRoute: claimOptions[0].value}}
      options={{
        title: 'Liste des réclamations',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name={routes.CLAIM_CARD}
      component={ClaimsCard}
      options={{
        title: 'Liste des réclamations',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name={routes.CLAIM_DETAIL}
      component={ClaimDetails}
      initialParams={{fromRoute: claimOptions[0].value}}
      options={{
        title: 'Détail réclamation',
      }}
    />
  </Stack.Navigator>
);

export default ToRepairListNavigator;
