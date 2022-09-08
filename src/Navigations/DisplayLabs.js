import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import LabsListing from '../Screens/HomeScreen/LabsListingScreen';
import LabsInfoScreen from '../Screens/LabsInfoScreen/LabsInfoScreen';
const Stack = createNativeStackNavigator();
const DisplayLabsNavigator = () => (
  <Stack.Navigator initialRouteName={routes.LAB_BLOCS}>
    <Stack.Screen
      name={routes.LAB_BLOCS}
      component={HomeScreen}
      options={{
        title: 'Liste des blocs',
        headerTitleAlign: 'center',
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
