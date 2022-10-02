import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import color from '../Config/color';

const WINDOWS = 'windows';
const MACOS = 'macos';
const LINUX = 'linux';
export default options = [
  {
    label: 'Windows',
    value: WINDOWS,
    customIcon: isSelected => (
      <Icon
        name="windows"
        size={22}
        color={isSelected ? 'white' : color.medium}
        style={styles.icon}
      />
    ),
  },
  {
    label: 'Linux',
    value: LINUX,
    customIcon: isSelected => (
      <Icon
        name="linux"
        size={22}
        color={isSelected ? 'white' : color.medium}
        style={styles.icon}
      />
    ),
  },
  {
    label: 'MacOS',
    value: MACOS,
    customIcon: isSelected => (
      <Icon
        name="apple"
        size={22}
        color={isSelected ? 'white' : color.medium}
        style={styles.icon}
      />
    ),
  },
];
const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
});
