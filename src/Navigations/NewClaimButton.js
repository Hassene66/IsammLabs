import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../Config/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NewClaimButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          size={45}
          color={colors.white}
        />
      </View>
    </TouchableOpacity>
  );
};

export default NewClaimButton;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 40,
    height: 75,
    width: 75,
    bottom: 35,
    borderColor: colors.white,
    borderWidth: 10,
  },
});
