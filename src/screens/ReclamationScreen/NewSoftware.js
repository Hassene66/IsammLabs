import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const NewSoftware = () => {
  return (
    <View>
      <Text style={styles.text}>Formulaire de réclamation</Text>
    </View>
  );
};

export default NewSoftware;

const styles = StyleSheet.create({
  text: {
    fontWeight: '400',
    fontFamily: 'System',
    paddingTop: 10,
    fontSize: 20,
  },
});
