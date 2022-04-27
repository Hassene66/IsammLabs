import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import defaultStyles from '../Config/styles';

const Input = ({
  name = 'name',
  placeholder = 'placeholder',
  keyboardType = 'default',
  icon = null,
  ...rest
}) => {
  const input_ref = useRef(null);

  return (
    <>
      <View style={[styles.inputContainer]}>
        <TextInput
          ref={input_ref}
          style={styles.input}
          label={placeholder}
          keyboardType={keyboardType}
          underlineColor="transparent"
          left={
            icon && (
              <TextInput.Icon
                name={icon}
                color={defaultStyles.colors.medium}
                size={21}
              />
            )
          }
          theme={{
            fonts: {
              regular: {
                fontFamily: defaultStyles.Text.fontFamily,
              },
            },
            colors: {
              primary: defaultStyles.colors.primary,
              text: defaultStyles.Text.color,
            },
          }}
          {...rest}
        />
      </View>
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 10,
    height: 65,
    overflow: 'hidden',
    shadowOpacity: 0.5,
  },
  input: {
    borderRadius: 0,
    height: 67,
    overflow: 'hidden',
    fontWeight: null,
    fontSize: defaultStyles.Text.fontSize,
  },
});
