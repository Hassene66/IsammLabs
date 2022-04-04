import React from 'react';
import {StyleSheet} from 'react-native';
import color from '../../Config/color';
import AppText from '../AppText';

const ErrorMessage = ({error, visible}) => {
  if (!visible || !error) return null;
  return <AppText style={styles.error}>{error}</AppText>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: color.primary,
    fontSize: 14,
  },
});
