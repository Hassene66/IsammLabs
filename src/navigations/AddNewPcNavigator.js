import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';
import AddPcFirstStepScreen from '../Screens/AddPcScreen/AddPcFirstStepScreen';
import AddPcSecondStepScreen from '../Screens/AddPcScreen/AddPcSecondStepScreen';
const Stack = createNativeStackNavigator();
const AddNewPcNavigator = () => (
  <Stack.Navigator initialRouteName={routes.ADD_CLAIM_FIRST}>
    <Stack.Screen
      name={routes.ADD_PC_FIRST}
      component={AddPcFirstStepScreen}
      options={{
        title: 'Ajouter ordinateur première étape',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name={routes.ADD_PC_SECOND}
      component={AddPcSecondStepScreen}
      options={{title: 'Ajouter pc deuxième étape'}}
    />
  </Stack.Navigator>
);

export default AddNewPcNavigator;
