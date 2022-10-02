import React from 'react';
import {View, StyleSheet} from 'react-native';
import color from '../../Config/color';

const ListItemSeperator = () => {
  return <View style={styles.seperator} />;
};
const styles = StyleSheet.create({
  seperator: {
    width: '100%',
    height: 2,
    backgroundColor: color.light,
  },
});

export default ListItemSeperator;
