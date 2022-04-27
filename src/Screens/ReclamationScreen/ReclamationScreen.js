import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import SoftwareRecalamation from './SoftwareRecalamation';
import HardwareReclamation from './HardwareReclamation';
import ReaclamationNavigation from '../../Navigations/ReaclamationNavigation';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const ReclamationScreen = ({}) => {
  const [isVisible, setIsVisible] = useState(false);
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <Tab.Navigator
        tabBar={props => (
          <ReaclamationNavigation
            {...props}
            PagesName={['Software', 'Hardware']}
          />
        )}
        tabBarOptions={{
          showLabel: false,
        }}
        swipeVelocityImpact={0.2}
        sceneContainerStyle={{
          backgroundColor: 'trasnparent',
        }}
        backBehavior="history"
        initialRouteName="SoftwareRecalamation">
        <Tab.Screen
          name="SoftwareReclamation"
          children={() => <SoftwareRecalamation />}
        />
        <Tab.Screen
          name="HardwareReclamation"
          children={() => <HardwareReclamation />}
        />
      </Tab.Navigator>
    </>
  );
};

export default ReclamationScreen;
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    height: 65,
    padding: 7,
    justifyContent: 'center',
    elevation: 10,
    shadowColor: 'rgba(255,78,54,18)',
  },
  title: {
    paddingRight: 10,
    fontSize: 12,
    fontFamily: 'System',
    color: '#FF6B21',
  },
  subTitle: {
    paddingRight: 10,
    fontSize: 15,
    fontFamily: 'System',
    color: 'black',
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingLeft: 7,
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    margin: 0,
    alignItems: undefined,
    justifyContent: 'flex-end',
  },
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
  list: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
    height: '80%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    overflow: 'hidden',
  },
  titleStyle: {
    marginVertical: 20,
    fontSize: 19,
    flex: 1,
  },
  btn: {
    fontFamily: 'System',
    fontSize: 16,
  },
  textInput: {
    fontFamily: 'System',
    textAlign: 'right',
    fontSize: 17,
    paddingLeft: 20,
  },
});
