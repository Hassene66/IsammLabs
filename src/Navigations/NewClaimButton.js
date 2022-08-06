import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import colors from '../Config/color';
import AddClaimBtn from '../assets/addClaim.svg';
const NewClaimButton = ({onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <AddClaimBtn />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewClaimButton;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 40,
    height: 85,
    width: 85,
    bottom: 50,
    borderColor: colors.lightBlue,
    borderWidth: 8,
  },
});
