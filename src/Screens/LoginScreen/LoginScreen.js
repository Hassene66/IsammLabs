import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import SVGImg from '../../assets/logo.svg';
import * as Yup from 'yup';
import {AppForm, AppFormField, SubmitButton} from '../../Components/forms';
import axios from 'axios';
import storage from '../../Utils/asyncStorage';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import FlashMessage, {showMessage} from 'react-native-flash-message';
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
const saveData = async data => {
  try {
    storage.setItem('user', data.user);
  } catch (e) {
    alert('Failed to save the data to the storage');
  }
};
const LoginScreen = ({setUser, navigation}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async values => {
    isMonting = true;
    setLoading(true);
    axios
      .post('http://172.30.208.93:5000/api/login', values)
      .then(({data}) => {
        saveData(data);
        setUser(data.user);
      })
      .catch(error => {
        if (error.response.status) {
          showMessage({
            message: 'Les informations de connexion fournies sont invalides',
            type: 'danger',
            icon: 'auto',
            duration: 2500,
          });
        } else {
          showMessage({
            message: 'Erreur de serveur',
            type: 'danger',
            icon: 'auto',
            duration: 2500,
          });
        }
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => () => (isMonting = false));
  return (
    <>
      <MyActivityIndicator loading={loading}>
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
        <FlashMessage position="top" />
      </MyActivityIndicator>
    </>
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
