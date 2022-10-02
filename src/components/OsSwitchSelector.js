import React from 'react';
import {StyleSheet, View} from 'react-native';
import color from '../Config/color';
import SwitchSelector from 'react-native-switch-selector';
import osOptions from '../Utils/osOptions';
import {useFormikContext} from 'formik';

const OsSwitchSelector = ({name, getSelectedItem = () => {}}) => {
  const {setFieldValue} = useFormikContext();
  return (
    <View style={styles.osContainer}>
      <SwitchSelector
        borderRadius={5}
        buttonColor={color.primary}
        options={osOptions}
        initial={0}
        textColor={color.medium}
        onPress={value => {
          setFieldValue(name, value), getSelectedItem(value);
        }}
        backgroundColor={color.white}
        borderColor={color.green}
        hasPadding
        height={61}
      />
    </View>
  );
};

export default OsSwitchSelector;

const styles = StyleSheet.create({
  osContainer: {},
});
