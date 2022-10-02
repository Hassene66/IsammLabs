import React from 'react';
import {StyleSheet} from 'react-native';
import RadioButtonRN from './RadioButtonRN';
import {useFormikContext} from 'formik';
import color from '../Config/color';
const RadioButton = ({data, initial = 1, name}) => {
  const {setFieldValue} = useFormikContext();
  return (
    <RadioButtonRN
      data={data}
      initial={initial}
      selectedBtn={item => setFieldValue(name, item.value)}
      textStyle={styles.textStyle}
      style={styles.RadioButtonContainer}
      duration={250}
      boxStyle={styles.boxStyle}
      modifiedVersion
      textColor={color.medium}
    />
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  RadioButtonContainer: {flexDirection: 'row', marginVertical: 7},
  boxStyle: {
    borderRadius: 5,
    borderWidth: 2,
    flex: 1,
  },
  textStyle: {fontFamily: 'System'},
});
