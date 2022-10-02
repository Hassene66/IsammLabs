import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Keyboard} from 'react-native';
import {TextInput} from 'react-native-paper';
import color from '../Config/color';
import defaultStyles from '../Config/styles';
const Input = ({
  name = 'name',
  placeholder = 'placeholder',
  keyboardType = 'default',
  icon: Icon = null,
  errors,
  touched,
  containerStyle,
  ...rest
}) => {
  const input_ref = useRef(null);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        input_ref.current.blur();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <>
      <View
        style={[
          styles.inputContainer,
          errors[name] && touched[name] && styles.error,
          containerStyle,
        ]}>
        <TextInput
          ref={input_ref}
          style={styles.input}
          label={placeholder}
          keyboardType={keyboardType}
          underlineColor="transparent"
          left={
            Icon && (
              <TextInput.Icon
                name={Icon}
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
    borderRadius: 5,
    height: 61,
    overflow: 'hidden',
    shadowOpacity: 0.5,
    borderWidth: 1,
    borderColor: color.green,
  },
  input: {
    borderRadius: 0,
    height: 63,
    overflow: 'hidden',
    fontWeight: null,
    fontSize: defaultStyles.Text.fontSize,
    backgroundColor: 'white',
  },
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
});
