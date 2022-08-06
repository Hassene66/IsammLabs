import React from 'react';
import {StyleSheet, Text} from 'react-native';
import color from '../Config/color';

const Title = ({text, titleStyle = {}}) => {
  return <Text style={[styles.text, {...titleStyle}]}>{text}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'System',
    fontSize: 25,
    color: color.primary,
  },
});
