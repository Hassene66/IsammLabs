import React, {useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';
import defaultStyles from '../Config/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AppTextInput = ({icon, width = '100%', ...Rest}) => {
  const input_ref = useRef(null);
  return (
    <TouchableWithoutFeedback onPress={() => input_ref.current.focus()}>
      <View style={[styles.container, {width}]}>
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
          placeholderTextColor={defaultStyles.colors.medium}
          style={defaultStyles.Text}
          {...Rest}
        />
      </View>
    </TouchableWithoutFeedback>
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
});
