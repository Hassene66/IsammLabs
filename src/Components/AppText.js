import React from 'react';
import {Text} from 'react-native';
import defaultStyles from '../Config/styles';

const AppText = ({children, style, ...otherProps}) => {
  return (
    <Text style={[defaultStyles.Text, style]} {...otherProps}>
      {children}
    </Text>
  );
};

export default AppText;
