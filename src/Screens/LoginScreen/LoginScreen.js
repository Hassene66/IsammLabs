import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import SVGImg from '../../assets/logo.svg';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import {AppForm, AppFormField, SubmitButton} from '../../Components/forms';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Veuillez indiquer votre email')
    .email('Veuillez fournir une adresse email valide')
    .label('Email'),
  password: Yup.string()
    .required('Veuillez indiquer votre mot de passe')
    .min(6, 'Un minimum de 6 caractères est requis  ')
    .label('Password'),
});

const LoginScreen = ({navigation}) => {
  const handleSubmit = values => {
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        navigation.navigate('Forgot Password');
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <SafeAreaView style={styles.loginScreen}>
      <AppForm
        initialValues={{email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <View style={styles.logo}>
          <SVGImg width={200} height={200} />
        </View>
        <View style={styles.loginForm}>
          <AppFormField
            icon="email"
            name="email"
            placeholder="email"
            keyboardType="email-address"
          />
          <AppFormField
            icon="lock"
            name="password"
            placeholder="mot de passe"
            secureTextEntry
          />
          <Text
            onPress={() => navigation.navigate('Forgot Password')}
            style={styles.forgotPassword}>
            mot de passe oublié?
          </Text>
          <SubmitButton title="Login" />
        </View>
      </AppForm>
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
