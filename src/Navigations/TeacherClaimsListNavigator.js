import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';
import ClaimsList from '../Screens/ClaimsListTeacher/ClaimsList';
import ClaimsCard from '../Screens/ClaimsListTeacher/ClaimsCard';
import ClaimDetails from '../Screens/ClaimsListTeacher/ClaimDetails';
const Stack = createNativeStackNavigator();
const TeacherClaimsListNavigator = ({route}) => {
  const fromRoute = route?.params?.fromRoute;
  return (
    <Stack.Navigator initialRouteName={routes.CLAIM_LIST}>
      <Stack.Screen
        name={routes.CLAIM_LIST}
        component={ClaimsList}
        initialParams={{fromRoute}}
        options={{
          title:
            fromRoute === routes.TEACHER_PASSED_CLAIMS
              ? 'Réclamations passées'
              : 'Réclamations expirées',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={routes.CLAIM_CARD}
        component={ClaimsCard}
        initialParams={{fromRoute}}
        options={{
          title:
            fromRoute === routes.TEACHER_PASSED_CLAIMS
              ? 'Réclamations passées'
              : 'Réclamations expirées',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={routes.CLAIM_DETAIL}
        initialParams={{fromRoute: routes.TEACHER_PASSED_CLAIMS}}
        component={ClaimDetails}
        options={{
          title: 'Détail réclamation',
        }}
      />
    </Stack.Navigator>
  );
};

export default TeacherClaimsListNavigator;
