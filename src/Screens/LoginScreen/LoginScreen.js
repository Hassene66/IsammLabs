import React, {useState, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import AppTextInput from '../../Components/AppTextInput';
import SVGImg from '../../assets/logo.svg';
import AppButton from '../../Components/AppButton';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 2000);
  }, []);

  useEffect(() => {
    auth()
      .signInWithEmailAndPassword('hassene.ayoub@yahoo.fr', '13456')
      .then(user => {
        console.log(user);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeArea style={styles.loginScreen}>
      <View style={styles.logo}>
        <SVGImg width={200} height={200} />
      </View>
      <View style={styles.loginForm}>
        <AppTextInput icon="email" placeholder="email" />
        <AppTextInput icon="lock" placeholder="password" secureTextEntry />
        <Text
          onPress={() => navigation.navigate('Forgot Password')}
          style={styles.forgotPassword}>
          forgot password?
        </Text>
        <AppButton title="login" style={styles.submitButton} />
      </View>
    </SafeArea>
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
  loginScreen: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  forgotPassword: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
