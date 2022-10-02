import {Root} from 'react-native-alert-notification';
import color from '../Config/color';

export default function AlertRoot({children}) {
  return (
    <Root
      theme="light"
      colors={[
        {
          danger: color.primary,
          card: color.lightBlue,
          overlay: 'black',
          label: 'black',
          success: color.primary,
          warning: color.primary,
        },
      ]}>
      {children}
    </Root>
  );
}
