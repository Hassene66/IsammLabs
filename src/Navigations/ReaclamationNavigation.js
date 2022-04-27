import {StyleSheet, Text, Dimensions, View} from 'react-native';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Title} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import color from '../Config/color';

const ReaclamationNavigation = ({
  state,
  descriptors,
  navigation,
  PagesName = null,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[color.primary, color.danger]}
      style={{
        overflow: 'hidden',
        borderRadius: 20,
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
              onPress={() => onPress()}
              testID={options.tabBarTestID}
              accessibilityRole="button">
              <View>
                {index === 0 && (
                  <View>
                    {isFocused ? (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: 53,
                            width: Dimensions.get('window').width / 2 - 20,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 15,
                          }}>
                          <Title
                            style={{
                              color: color.dark,
                              fontSize: 18,
                              fontWeight: 'bold',
                            }}>
                            {PagesName[0]}
                          </Title>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          height: 53,
                          width: Dimensions.get('window').width / 2 - 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Title
                          style={{
                            color: color.dark,
                            fontSize: 18,
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
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: 53,
                            width: Dimensions.get('window').width / 2 - 65,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 15,
                          }}>
                          <Title
                            style={{
                              color: color.dark,
                              fontSize: 18,
                              fontWeight: 'bold',
                            }}>
                            {PagesName[1]}
                          </Title>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          height: 53,
                          width: Dimensions.get('window').width / 2 - 65,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Title
                          style={{
                            color: color.dark,
                            fontSize: 18,
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

export default ReaclamationNavigation;
