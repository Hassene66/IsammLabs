import React, {useRef, useEffect} from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';
import defaultStyles from '../Config/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ErrorMessage from './forms/ErrorMessage';
import color from '../Config/color';

const AppTextInput = ({
  icon,
  width = '100%',
  onChange = () => {},
  error = null,
  ...Rest
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
      <TouchableWithoutFeedback
        onPress={() => {
          input_ref.current.focus();
        }}>
        <View style={[styles.container, {width}, error && styles.error]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          <TextInput
            ref={input_ref}
            onEndEditing={() => {
              Keyboard.dismiss();
            }}
            placeholderTextColor={defaultStyles.colors.medium}
            style={defaultStyles.Text}
            onChangeText={onChange}
            {...Rest}
          />
        </View>
      </TouchableWithoutFeedback>
      <ErrorMessage error={error} visible={error} />
    </>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Platform.OS === 'ios' ? 18 : 7,
    marginVertical: 10,
  },
  icon: {marginRight: 8, marginLeft: 2},
  error: {
    borderWidth: 2,
    borderColor: color.primary,
  },
});
