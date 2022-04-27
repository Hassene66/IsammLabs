import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Title = ({text, titleStyle = {}}) => {
  return <Text style={[styles.text, {...titleStyle}]}>{text}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'System',
    fontSize: 25,
    color: '#FF6B21',
  },
});
