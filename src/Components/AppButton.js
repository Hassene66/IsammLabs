import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../Config/color';
const AppButton = ({
  title,
  onPress,
  color = 'primary',
  style = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: colors[color]}, style]}
      onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginVertical: 7,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});
