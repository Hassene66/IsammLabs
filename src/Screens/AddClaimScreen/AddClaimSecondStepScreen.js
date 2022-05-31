import {StyleSheet} from 'react-native';
import React from 'react';
import SoftwareClaimForm from './SoftwareClaimForm';
import HardwareReclamation from './HardwareClaimForm';
import CustomTopTabNavigator from '../../Navigations/CustomTopTabNavigator';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const AddClaimSecondStepScreen = ({}) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <Tab.Navigator
        tabBar={props => (
          <CustomTopTabNavigator
            {...props}
            PagesName={['Software', 'Hardware']}
          />
        )}
        screenOptions={{
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
          children={() => <SoftwareClaimForm />}
        />
        <Tab.Screen
          name="HardwareReclamation"
          children={() => <HardwareReclamation />}
        />
      </Tab.Navigator>
    </>
  );
};

export default AddClaimSecondStepScreen;
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
