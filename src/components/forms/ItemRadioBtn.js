import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import RadioButtonRN from './RadioButtonRN';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Title from './Title';
const ItemRadioBtn = ({title = '', data, onPress, initial = 1}) => {
  return (
    <>
      <Title text={title} titleStyle={styles.titleStyle} />
      <View>
        <ScrollView>
          <RadioButtonRN
            data={data}
            textStyle={styles.textStyle}
            box={false}
            initial={initial}
            selectedBtn={item => onPress(item)}
            icon={
              <Icon name="radio-button-checked" size={26} color="#FF6B21" />
            }
          />
        </ScrollView>
      </View>
    </>
  );
};

export default ItemRadioBtn;

const styles = StyleSheet.create({
  textStyle: {fontFamily: 'System'},
  titleStyle: {
    marginBottom: 5,
    fontSize: 20,
    marginLeft: 25,
  },
});
