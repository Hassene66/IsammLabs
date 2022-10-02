import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';
import color from '../Config/color';
const AppText = ({children, style, ...otherProps}) => {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      ios: {
        fontSize: 18,
        fontFamily: 'Avenir',
        color: color.dark,
      },
      android: {
        fontSize: 18,
        fontFamily: 'System',
        color: color.dark,
      },
    }),
  },
});

export default AppText;
