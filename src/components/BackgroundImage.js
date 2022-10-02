import {StyleSheet, Dimensions, View} from 'react-native';
import React from 'react';
const originalWidth = 428;
const originalHeight = 928;
const aspectRatio = originalWidth / originalHeight;
const windowWidth = Dimensions.get('window').width;
import Svg from './BackgroundSVG';
const BackgroundImage = () => {
  return (
    <View style={{width: windowWidth, aspectRatio}}>
      <Svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${originalWidth} ${originalHeight}`}></Svg>
    </View>
  );
  x;
};

export default BackgroundImage;

const styles = StyleSheet.create({});
