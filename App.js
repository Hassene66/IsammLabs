import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
} from 'react-native';

import AppTextInput from './src/Components/AppTextInput';
import SVGImg from './src/assets/logo.svg';
import AppButton from './src/Components/AppButton';
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#f2f2f2', flex: 1}}>
      <View style={styles.logo}>
        <SVGImg width={200} height={200} />
      </View>
      <View style={{margin: 15}}>
        <AppTextInput icon="email" placeholder="email" />
        <AppTextInput icon="lock" placeholder="password" secureTextEntry />
        <AppButton title="login" style={{marginTop: 25}} />
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
});

export default App;
