import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Root} from 'react-native-alert-notification';

const HomeScreen = () => {
  const handleSubmit = values => {
    console.log(values);
  };
  return (
    <View style={styles.container}>
      <Root theme="light">
        <Text>Test</Text>
      </Root>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  loginScreen: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  loginForm: {
    margin: 15,
  },
});
