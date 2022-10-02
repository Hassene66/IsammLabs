import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {AppForm, AppFormField, SubmitButton} from '../../Components/forms';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Veuillez indiquer votre email')
    .email('Veuillez fournir une adresse email valide')
    .label('Email'),
});

const ForgotPassword = () => {
  const handleSubmit = values => {};

  return (
    <SafeAreaView style={styles.loginScreen}>
      <View style={styles.loginForm}>
        <Text style={styles.inputLabel}>Confirmer votre email :</Text>
        <AppForm
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <AppFormField
            icon="email"
            name="email"
            placeholder="email"
            keyboardType="email-address"
          />
          <SubmitButton title="soumettre" />
        </AppForm>
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
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ForgotPassword;
