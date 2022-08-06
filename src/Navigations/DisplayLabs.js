import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import LabsListing from '../Screens/HomeScreen/LabsListingScreen';
import LabsInfoScreen from '../Screens/LabsInfoScreen/LabsInfoScreen';
const Stack = createNativeStackNavigator();
const DisplayLabsNavigator = () => (
  <Stack.Navigator initialRouteName={routes.ACCEUIL}>
    <Stack.Screen
      name={routes.ACCEUIL}
      component={HomeScreen}
      options={{
        headerTitleAlign: 'center',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={routes.LABS_INFO}
      component={LabsListing}
      options={{title: 'Les laboratoires'}}
    />
    <Stack.Screen
      name={routes.PC_LISTING}
      component={LabsInfoScreen}
      options={{title: 'Liste des ordinateurs'}}
    />
  </Stack.Navigator>
);

export default DisplayLabsNavigator;
