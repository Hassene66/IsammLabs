import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import AddClaimBtn from '../assets/addClaim.svg';
const NewClaimButton = ({onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <AddClaimBtn height={80} />
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
    height: 85,
    width: 85,
    bottom: 50,
  },
});
