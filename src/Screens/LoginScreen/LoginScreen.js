import React, {useState, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import AppTextInput from '../../Components/AppTextInput';
import SVGImg from '../../assets/logo.svg';
import AppButton from '../../Components/AppButton';
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 2000);
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = () => {};
  return (
    <SafeAreaView style={styles.loginScreen}>
      <View style={styles.logo}>
        <SVGImg width={200} height={200} />
      </View>
      <View style={styles.loginForm}>
        <AppTextInput icon="email" placeholder="email" />
        <AppTextInput icon="lock" placeholder="password" secureTextEntry />
        <AppButton title="login" style={styles.submitButton} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 25,
    display: 'flex',
    alignSelf: 'center',
  },
  loginForm: {
    margin: 15,
  },
  submitButton: {
    marginTop: 25,
  },
  loginScreen: {backgroundColor: '#f2f2f2', flex: 1},
});

export default App;
