import {DefaultTheme} from '@react-navigation/native';
import colors from '../Config/color';
export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: '#fefefe',
  },
};
