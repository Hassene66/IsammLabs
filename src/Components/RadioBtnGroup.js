import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import RadioButton from './RadioButtonRN';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Title from './Title';
import color from '../Config/color';
const ItemRadioBtn = ({title = '', data, onPress, initial = 1}) => {
  return (
    <>
      <Title text={title} titleStyle={styles.titleStyle} />
      <View>
        <ScrollView>
          <RadioButton
            data={data}
            textStyle={styles.textStyle}
            box={false}
            initial={initial}
            selectedBtn={item => onPress(item)}
            icon={
              <Icon
                name="radio-button-checked"
                size={26}
                color={color.primary}
              />
            }
          />
        </ScrollView>
      </View>
    </>
  );
};

export default ItemRadioBtn;

const styles = StyleSheet.create({
  textStyle: {fontFamily: 'Cairo-SemiBold'},
  titleStyle: {
    marginBottom: 5,
    fontSize: 20,
    marginLeft: 25,
  },
});
