import React, {useState, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import AppTextInput from '../../Components/AppTextInput';
import AppButton from '../../Components/AppButton';
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 2000);
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = email => {
    console.log('email: ', email);
  };
  return (
    <SafeAreaView style={styles.loginScreen}>
      <View style={styles.loginForm}>
        <Text style={styles.inputLabel}>Confirmer votre email :</Text>
        <AppTextInput
          icon="email"
          placeholder="email"
          onChangeText={handleChange}
        />
        <AppButton title="submit" style={styles.submitButton} />
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

export default App;
