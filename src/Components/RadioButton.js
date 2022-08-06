import React from 'react';
import {StyleSheet} from 'react-native';
import RadioButtonRN from './RadioButtonRN';
import {useFormikContext} from 'formik';
const RadioButton = ({data, initial = 1, name}) => {
  const {setFieldValue} = useFormikContext();
  return (
    <RadioButtonRN
      data={data}
      initial={initial}
      selectedBtn={item => setFieldValue(name, item)}
      textStyle={styles.textStyle}
      style={styles.RadioButtonContainer}
      duration={250}
      boxStyle={styles.boxStyle}
      modifiedVersion
    />
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  RadioButtonContainer: {flexDirection: 'row', marginVertical: 7},
  boxStyle: {
    borderRadius: 10,
    borderWidth: 2,
    flex: 1,
    margin: 5,
  },
  textStyle: {fontFamily: 'System'},
});
