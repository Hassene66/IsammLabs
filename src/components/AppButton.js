import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import color from '../Config/color';
const AppButton = ({
  title,
  onPress,
  isGradient = false,
  style = {},
  textStyle = {},
}) => {
  const GradientWrapper = ({children}) =>
    isGradient ? (
      <LinearGradient
        colors={['#0E94CF', '#8DCBCB']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={[styles.linearGradient, style]}>
        {children}
      </LinearGradient>
    ) : (
      children
    );
  return (
    <TouchableOpacity
      style={[styles.button, !isGradient && styles.notGradient, style]}
      onPress={onPress}>
      <GradientWrapper>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </GradientWrapper>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  linearGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderRadius: 5,
  },
  notGradient: {
    padding: 10,
    backgroundColor: color.lighter,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.medium,
  },
});
