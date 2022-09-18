import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';
import Notification from '../Screens/TechnicienNotification/ListNotification';
import TeacherProfile from '../Screens/MyProfileScreen/TeacherProfile';
import ToConfirmClaimsNavigator from './ToConfirmClaimsNavigator';
import TeacherClaimsListNavigator from './TeacherClaimsListNavigator';
const Stack = createNativeStackNavigator();
const TeacherProfileNavigator = () => (
  <Stack.Navigator initialRouteName={routes.TEACHER_PROFILE}>
    <Stack.Screen
      name={routes.TEACHER_PROFILE}
      component={TeacherProfile}
      options={{
        title: 'Mon profile',
      }}
    />
    <Stack.Screen
      name={routes.TEACHER_EXPIRED_CLAIMS}
      component={TeacherClaimsListNavigator}
      initialParams={{fromRoute: routes.TEACHER_EXPIRED_CLAIMS}}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={routes.TEACHER_PASSED_CLAIMS}
      component={TeacherClaimsListNavigator}
      initialParams={{fromRoute: routes.TEACHER_PASSED_CLAIMS}}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={routes.TO_CONFIRM_CLAIMS}
      component={ToConfirmClaimsNavigator}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={routes.TEACHER_NOTIFICATION}
      component={Notification}
      options={{title: 'Mes notifications'}}
    />
  </Stack.Navigator>
);

export default TeacherProfileNavigator;
