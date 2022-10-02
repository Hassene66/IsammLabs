import React from 'react';
import {StyleSheet, View} from 'react-native';
import color from '../Config/color';
import SwitchSelector from 'react-native-switch-selector';
import options from '../Utils/claimOptions';
import {useFormikContext} from 'formik';

const ClaimStatusSwitchSelector = ({
  name,
  getSelectedItem = () => {},
  switchOptons = options,
}) => {
  const {setFieldValue} = useFormikContext();
  return (
    <SwitchSelector
      borderRadius={5}
      buttonColor={color.primary}
      options={switchOptons}
      initial={0}
      onPress={value => {
        setFieldValue(name, value), getSelectedItem(value);
      }}
      backgroundColor={color.lighter}
    />
  );
};

export default ClaimStatusSwitchSelector;

const styles = StyleSheet.create({
  osContainer: {marginTop: 15},
});
