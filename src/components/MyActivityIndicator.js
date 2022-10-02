import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import color from '../Config/color';
import uuid from 'react-native-uuid';

const MyActivityIndicator = ({loading, children}) => {
  return (
    <>
      {[
        children,
        loading && (
          <View key={uuid.v4()} style={styles.overlay}>
            <ActivityIndicator size="large" color={color.primary} />
          </View>
        ),
      ]}
    </>
  );
};

export default MyActivityIndicator;
const styles = StyleSheet.create({
  overlay: {
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    opacity: 0.8,
    zIndex: 1,
  },
});
