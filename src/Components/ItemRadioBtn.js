import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import RadioButtonRN from './RadioButtonRN';
import Icon from 'react-native-vector-icons/MaterialIcons';
import color from '../Config/color';
const ItemRadioBtn = ({data, onPress, initial = 1}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <RadioButtonRN
          data={data}
          textStyle={styles.textStyle}
          box={false}
          initial={initial}
          selectedBtn={item => onPress(item)}
          icon={
            <Icon name="radio-button-checked" size={26} color={color.primary} />
          }
        />
      </View>
    </ScrollView>
  );
};

export default ItemRadioBtn;

const styles = StyleSheet.create({
  textStyle: {fontFamily: 'System'},
  titleStyle: {
    marginBottom: 5,
    fontSize: 20,
    marginLeft: 15,
  },
  container: {paddingBottom: 45},
});
