import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  const handleSubmit = values => {
    console.log(values);
  };
  return (
    <View>
      <Text>Test</Text>
    </View>
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
