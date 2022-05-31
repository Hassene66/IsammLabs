import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Background = ({children, isInverted, withPadding = true}) => {
  return (
    <LinearGradient
      colors={
        isInverted
          ? ['#FFFBFA', '#FFF8F5', '#fff1eb', '#FEE4D7']
          : ['#FEE4D7', '#FFEFE7', '#FFF8F4']
      }
      style={[styles.bg, withPadding && styles.padding]}>
      {children}
    </LinearGradient>
  );
};

export default Background;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  padding: {
    padding: 15,
  },
});
