import React from 'react';
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import color from '../../Config/color';
import AppText from '../Text';

const ListItem = ({title, subTitle, image, IconComponent, onPress}) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={color.light}>
      <View style={styles.container}>
        {IconComponent}
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.detailContainer}>
          <AppText numberOfLines={1} style={styles.title}>
            {title}
          </AppText>
          {subTitle && (
            <AppText numberOfLines={2} style={styles.subTitle}>
              {subTitle}
            </AppText>
          )}
        </View>
        <MaterialCommunityIcons
          color={color.medium}
          name="chevron-right"
          size={25}
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: color.white,
    alignItems: 'center',
  },
  detailContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  title: {
    fontWeight: '600',
  },
  subTitle: {
    color: color.medium,
    fontSize: 14,
  },
});
export default ListItem;
