import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';
import ClaimsList from '../Screens/ClaimsList/ClaimsList';
import ClaimDetails from '../Screens/ClaimsList/ClaimDetails';
import ClaimsCard from '../Screens/ClaimsList/ClaimsCard';
const Stack = createNativeStackNavigator();
const AddClaimNavigator = () => (
  <Stack.Navigator initialRouteName={routes.CLAIM_LIST}>
    <Stack.Screen
      name={routes.CLAIM_LIST}
      component={ClaimsList}
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
      options={{
        title: 'Détail réclamation',
      }}
    />
  </Stack.Navigator>
);

export default AddClaimNavigator;

const styles = StyleSheet.create({});
