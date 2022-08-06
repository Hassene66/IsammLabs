import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewClaimButton from './NewClaimButton';
import routes from './routes';
import AddClaimNavigator from './AddClaimNavigator';
import DisplayLabsNavigator from './DisplayLabs';
import MyProfileScreen from '../Screens/MyProfileScreen/MyProfileScreen';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../Config/color';
import {View, StyleSheet} from 'react-native';
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
        height: 92,
        paddingTop: 10,
      },
    }}>
    <Tab.Screen
      name={routes.ACCEUIL}
      component={DisplayLabsNavigator}
      options={{
        tabBarIcon: ({size, focused}) => {
          return (
            <View>
              {focused && <View style={styles.dotStyle} />}
              <MaterialCommunityIcons
                name="home"
                size={size + 17}
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
      name={routes.PROFILE}
      children={() => <MyProfileScreen />}
      options={{
        tabBarIcon: ({size, focused}) => {
          return (
            <View>
              {focused && <View style={styles.dotStyle} />}
              <MaterialCommunityIcons
                name="account"
                size={size + 17}
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
    left: 17,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: color.white,
  },
});
