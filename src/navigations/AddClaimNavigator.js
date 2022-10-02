import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddClaimScreen from '../Screens/AddClaimScreen/AddClaimFirstStepScreen';
import routes from './routes';
import AddClaimSecondStepScreen from '../Screens/AddClaimScreen/AddClaimSecondStepScreen';
const Stack = createNativeStackNavigator();
const AddClaimNavigator = () => (
  <Stack.Navigator initialRouteName={routes.ADD_CLAIM_FIRST}>
    <Stack.Screen
      name={routes.ADD_CLAIM_FIRST}
      component={AddClaimScreen}
      options={{title: 'Ajouter une réclamation', headerTitleAlign: 'center'}}
    />
    <Stack.Screen
      name={routes.ADD_CLAIM_SECOND}
      component={AddClaimSecondStepScreen}
      options={{title: 'Details réclamation'}}
    />
  </Stack.Navigator>
);

export default AddClaimNavigator;
