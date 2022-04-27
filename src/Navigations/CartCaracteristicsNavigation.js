import React from 'react';
import PcCaractiresitics from '../Screens/LabsInfoScreen/PcCaracteresitics';
import SoftwaresInstalled from '../Screens/LabsInfoScreen/SoftwaresInstalled';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const CartCaracteristicsNavigation = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Caractéristique"
        component={() => <PcCaractiresitics key={data._id} data={data} />}
      />
      <Tab.Screen
        name="Logiciel Installé"
        component={() => <SoftwaresInstalled key={data._id} data={data} />}
      />
    </Tab.Navigator>
  );
};

export default CartCaracteristicsNavigation;
