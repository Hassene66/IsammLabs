import {
  TouchableWithoutFeedback,
  Dimensions,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {Title} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import color from '../Config/color';
import MaskedView from '@react-native-masked-view/masked-view';

const CustomTopTabNavigator = ({
  state,
  descriptors,
  navigation,
  PagesName = null,
}) => {
  return (
    <LinearGradient
      colors={['#0E94CF', '#8DCBCB']}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      style={{
        overflow: 'hidden',
        borderRadius: 5,
        marginHorizontal: 12,
        marginTop: 15,
      }}>
      <View
        style={{
          height: 80,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const {options} = descriptors[route.key];
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={onPress}
              testID={options.tabBarTestID}
              accessibilityRole="button">
              <View>
                {index === 0 && (
                  <View>
                    {isFocused ? (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: 53,
                            width: Dimensions.get('window').width / 2 - 30,
                            backgroundColor: 'white',
                            // opacity: 0.7,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                          }}>
                          <MaskedView
                            maskElement={
                              <Text
                                style={[
                                  styles.title,
                                  {backgroundColor: 'transparent'},
                                ]}>
                                {PagesName[0]}
                              </Text>
                            }>
                            <LinearGradient
                              start={{x: 0, y: 0}}
                              end={{x: 1, y: 0}}
                              colors={[
                                '#0e94cf',
                                '#289fce',
                                '#5db5cc',
                                '#72bfcc',
                                '#8ac9cb',
                              ]}>
                              <Text style={[styles.title, {opacity: 0}]}>
                                {PagesName[0]}
                              </Text>
                            </LinearGradient>
                          </MaskedView>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          height: 53,
                          width: Dimensions.get('window').width / 2 - 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 15,
                        }}>
                        <Title
                          style={{
                            color: color.white,
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          {PagesName[0]}
                        </Title>
                      </View>
                    )}
                  </View>
                )}

                {index === 1 && (
                  <View>
                    {isFocused ? (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: 53,
                            width: Dimensions.get('window').width / 2 - 30,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                          }}>
                          <MaskedView
                            maskElement={
                              <Text
                                style={[
                                  styles.title,
                                  {backgroundColor: 'transparent'},
                                ]}>
                                {PagesName[1]}
                              </Text>
                            }>
                            <LinearGradient
                              start={{x: 0, y: 0}}
                              end={{x: 1, y: 0}}
                              colors={[
                                '#0e94cf',
                                '#289fce',
                                '#5db5cc',
                                '#72bfcc',
                                '#8ac9cb',
                              ]}>
                              <Text style={[styles.title, {opacity: 0}]}>
                                {PagesName[1]}
                              </Text>
                            </LinearGradient>
                          </MaskedView>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          height: 53,
                          width: Dimensions.get('window').width / 2 - 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 15,
                        }}>
                        <Title
                          style={{
                            color: color.white,
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          {PagesName[1]}
                        </Title>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </LinearGradient>
  );
};
export default CustomTopTabNavigator;
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#696969',
    fontWeight: '900',
  },
});
