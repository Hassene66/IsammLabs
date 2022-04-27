import React from 'react';
import {StyleSheet} from 'react-native';
import {HelperText} from 'react-native-paper';
const ErrorMessage = ({error}) => {
  const {isValid} = useFormikContext();
  if (!isValid && error)
    return <HelperText style={styles.error}>{error}</HelperText>;
  return null;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontFamily: 'System',
  },
});
