import {StyleSheet, SafeAreaView, View} from 'react-native';
import React from 'react';
import AppTextInput from '../../Components/AppTextInput';
import {AppForm, AppFormField} from '../../Components/forms';
import * as Yup from 'yup';

const HomeScreen = () => {
  const handleSubmit = values => {
    console.log(values);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Veuillez indiquer votre email')
      .email('Veuillez fournir une adresse email valide')
      .label('Email'),
  });
  return (
    <SafeAreaView style={styles.loginScreen}>
      <View style={styles.loginForm}>
        <AppForm
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <AppFormField
            name="email"
            placeholder="email"
            keyboardType="email-address"
          />
        </AppForm>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  loginScreen: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  loginForm: {
    margin: 15,
  },
});
