import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewClaimButton from './NewClaimButton';
import routes from './routes';
import AddClaimNavigator from './AddClaimNavigator';
import DisplayLabsNavigator from './DisplayLabs';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../Config/color';
import {View, StyleSheet} from 'react-native';
import TeacherProfileNavigator from './TeacherProfileNavigator';
const Tab = createBottomTabNavigator();
const TeacherTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarBackground: () => (
        <LinearGradient
          colors={['#1a99cf', '#2aa0ce', '#5cb7cc', '#7cc3cc', '#85c5c8']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}
        />
      ),
      tabBarStyle: {
        shadowColor: 'transparent',
        backgroundColor: 'transparent',
        height: 60,
      },
    }}>
    <Tab.Screen
      name={routes.ACCEUIL}
      component={DisplayLabsNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({size, focused}) => {
          return (
            <View>
              {focused && <View style={styles.dotStyle} />}
              <MaterialCommunityIcons
                name="home"
                size={size + 10}
                color={color.white}
              />
            </View>
          );
        },
      }}
    />
    <Tab.Screen
      name={routes.ADD_CLAIM}
      component={AddClaimNavigator}
      options={({navigation}) => ({
        headerShown: false,
        tabBarButton: () => (
          <NewClaimButton
            onPress={() => navigation.navigate(routes.ADD_CLAIM)}
          />
        ),
      })}
    />
    <Tab.Screen
      name={routes.TEACHER_PROFILE_TAB}
      children={TeacherProfileNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({size, focused}) => {
          return (
            <View>
              {focused && <View style={styles.dotStyle} />}
              <MaterialCommunityIcons
                name="account"
                size={size + 10}
                color={color.white}
              />
            </View>
          );
        },
      }}
    />
  </Tab.Navigator>
);

export default TeacherTabNavigator;

const styles = StyleSheet.create({
  dotStyle: {
    left: 15,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: color.white,
  },
});
