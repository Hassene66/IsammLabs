import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Dimensions, View, Text} from 'react-native';
import BackgroundImage from '../../Components/BackgroundImage';
import color from '../../Config/color';
import IsammSVG from '../../Components/IsammSVG';
import * as Yup from 'yup';
import {AppForm, AppFormField, SubmitButton} from '../../Components/forms';
import storage from '../../Utils/asyncStorage';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';
import authService from '../../Services/authService';
import userService from '../../Services/userService';
import moment from 'moment-timezone';
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
const saveData = async (key, data) => {
  try {
    storage.setItem(key, data);
  } catch (e) {
    alert('Failed to save the data to the storage');
  }
};
const LoginScreenV2 = ({setUser, navigation}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async values => {
    setLoading(true);
    authService
      .loginApi(values)
      .then(({data}) => {
        saveData('user', data.user);
        setUser(data.user);
        saveFcmKeyToDatabase(data?.user?._id);
      })
      .catch(error => {
        if (error?.response?.status) {
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

  const saveFcmKeyToDatabase = async uid => {
    try {
      const fcm_key = await storage.getItem('fcm_token');
      await userService.updateFCMTokenApi(uid, fcm_key);
    } catch (error) {
      showMessage({
        message: 'Erreur de serveur',
        type: 'danger',
        icon: 'auto',
        duration: 2500,
      });
    }
  };
  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        saveData('fcm_token', token);
      });
  }, []);

  return (
    <MyActivityIndicator loading={loading}>
      <SafeAreaView style={styles.loginScreen}>
        <BackgroundImage />
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>LABS</Text>
          </View>

          <View style={styles.formContainer}>
            <View
              style={{
                justifyContent: 'flex-start',
              }}>
              <IsammSVG />
            </View>
            <View style={{width: '100%'}}>
              <AppForm
                initialValues={{email: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                <View>
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
                  <View style={{marginTop: 20}}>
                    <SubmitButton title="Login" />
                  </View>
                  <Text style={styles.footerText}></Text>
                </View>
              </AppForm>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <Text style={styles.footerText}>© ISAMM LABS {moment().year()}</Text>
      <FlashMessage position="top" />
    </MyActivityIndicator>
  );
};

export default LoginScreenV2;

const styles = StyleSheet.create({
  loginScreen: {
    backgroundColor: color.white,
    flex: 1,
  },
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
    height: Dimensions.get('screen').height / 6,
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
    alignItems: 'center',
    top: 0,
    marginHorizontal: 22,
    padding: 20,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 8,
  },
  footerText: {
    marginVertical: 15,
    color: color.green,
    fontSize: 16,
    textAlign: 'center',
  },
});
