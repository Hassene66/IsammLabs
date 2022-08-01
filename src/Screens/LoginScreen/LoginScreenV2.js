import {StyleSheet, Dimensions, View, Text} from 'react-native';
import React from 'react';
import BackgroundImage from '../../Components/BackgroundImage';
import color from '../../Config/color';
import IsammSVG from '../../Components/IsammSVG';

const LoginScreenV2 = () => {
  return (
    <View>
      <BackgroundImage />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>LABS</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={{flex: 1, margin: 10}}>
            <IsammSVG />
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreenV2;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  titleContainer: {
    position: 'relative',
    height: Dimensions.get('screen').height / 4,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'red',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: Dimensions.get('screen').height / 4,
    margin: 30,
    height: Dimensions.get('screen').height / 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 10,
    shadowRadius: 5,

    elevation: 10,
  },
});
