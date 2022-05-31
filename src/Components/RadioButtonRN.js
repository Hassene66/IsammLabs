import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Animated, TouchableOpacity} from 'react-native';

class RadioButtonRN extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: -1,
      fadeAnim: new Animated.Value(0),
      animations: [],
    };
    // this.fadeAnim = new Animated.Value(0);

    this.animations = [
      {
        name: 'zoomIn',
        animation: {
          scale: this.state.fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      },
      {
        name: 'pulse',
        animation: {
          scale: this.state.fadeAnim.interpolate({
            inputRange: [0, 0.4, 0.7, 1],
            outputRange: [0.7, 1, 1.3, 1],
          }),
        },
      },
      {
        name: 'shake',
        animation: {
          scale: this.state.fadeAnim.interpolate({
            inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
            outputRange: [0.8, 1.2, 0.8, 1.2, 0.8, 1],
          }),
        },
      },
      {
        name: 'rotate',
        animation: {
          rotate: this.state.fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          }),
        },
      },
    ];

    this._changeRadio = this._changeRadio.bind(this);
    this._checkAnimatons = this._checkAnimatons.bind(this);
  }

  componentDidMount() {
    this._checkAnimatons();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeIndex === -1 && this.props.initial > 0) {
      const initialActive = this.props.initial - 1;
      this._changeRadio(this.props.data[initialActive], initialActive);
    }
    if (this.props.initial !== prevProps.initial) {
      const initialActive = this.props.initial - 1;
      this._changeRadio(this.props.data[initialActive], initialActive);
    }
    if (this.props.animationTypes !== prevProps.animationTypes) {
      this._checkAnimatons();
    }
  }

  _checkAnimatons() {
    const {animationTypes} = this.props;

    this.setState({animations: []});
    const newAnim = [];
    animationTypes &&
      animationTypes.map((item, index) => {
        const itm = this.animations.find(e => e.name === item);
        if (itm) {
          newAnim.push(itm.animation);
        }
      });
    this.setState({animations: newAnim});
  }

  _changeRadio(item, activeIndex) {
    this.setState({activeIndex});
    if (activeIndex !== this.state.activeIndex) {
      this.fadeInAnimation();
    }
    this.props.selectedBtn(item);
  }

  fadeInAnimation = () => {
    // this.fadeAnim.setValue(0)
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: this.props.duration,
        delay: 10,
        useNativeDriver: true,
      }).start();
    });
  };

  render() {
    let {activeIndex, fadeAnim, animations = 0} = this.state;
    let {
      boxStyle,
      style,
      circleSize,
      textStyle,
      data,
      icon,
      activeColor,
      deactiveColor,
      boxActiveBgColor,
      boxDeactiveBgColor,
      box,
      textColor,
      modifiedVersion,
    } = this.props;

    return (
      <View style={style}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                box ? styles.productBox : styles.productBoxLess,
                box && {
                  backgroundColor:
                    activeIndex === index
                      ? boxActiveBgColor
                      : boxDeactiveBgColor,
                },
                modifiedVersion && {
                  borderColor: activeIndex === index ? activeColor : 'white',
                  elevation: activeIndex === index ? null : 15,
                },
                boxStyle,
              ]}
              activeOpacity={0.9}
              onPress={() => this._changeRadio(item, index)}>
              <View
                style={[
                  styles.rightProductBox,
                  !modifiedVersion && {flex: 1, alignItems: 'center'},
                ]}>
                <View
                  style={[
                    icon ? styles.icon : styles.circle,
                    {
                      borderColor:
                        activeIndex === index ? activeColor : deactiveColor,
                      width:
                        activeIndex === index ? circleSize + 8 : circleSize + 5,
                      height:
                        activeIndex === index ? circleSize + 8 : circleSize + 5,
                    },
                    icon && {
                      borderColor:
                        activeIndex === index ? 'transparent' : '#CCCCCC',
                      borderWidth: 1,
                    },
                  ]}>
                  <Animated.View
                    style={{
                      opacity: activeIndex === index ? fadeAnim : 0,
                    }}>
                    <Animated.View
                      style={{
                        transform: animations,
                      }}>
                      {icon ? (
                        icon
                      ) : (
                        <View
                          style={[
                            styles.circleFill,
                            {
                              backgroundColor:
                                activeIndex === index
                                  ? activeColor
                                  : deactiveColor,
                              borderColor:
                                activeIndex === index
                                  ? activeColor
                                  : deactiveColor,
                              width: circleSize,
                              height: circleSize,
                            },
                          ]}
                        />
                      )}
                    </Animated.View>
                  </Animated.View>
                </View>
              </View>
              <View style={[styles.centerProductBox]}>
                <Text
                  style={[
                    {
                      color: textColor,
                    },
                    textStyle,
                  ]}>
                  {item.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

/* Styles ====================================== */
const styles = StyleSheet.create({
  productBox: {
    flexDirection: 'row',
    borderRadius: 7,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 10,
  },
  productBoxLess: {
    flexDirection: 'row',
    marginTop: 10,
  },
  rightProductBox: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerProductBox: {
    flex: 6,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  circle: {
    borderWidth: 1,
    borderRadius: 10000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    borderWidth: 1,
    borderRadius: 10000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleFill: {
    borderWidth: 1,
    borderRadius: 10000,
  },
});

/* Props ======================================= */
RadioButtonRN.propTypes = {
  style: PropTypes.object,
  boxStyle: PropTypes.object,
  textStyle: PropTypes.object,
  initial: PropTypes.number,
  circleSize: PropTypes.number,
  duration: PropTypes.number,
  data: PropTypes.array,
  animationTypes: PropTypes.array,
  selectedBtn: PropTypes.func,
  activeColor: PropTypes.string,
  deactiveColor: PropTypes.string,
  boxActiveBgColor: PropTypes.string,
  boxDeactiveBgColor: PropTypes.string,
  textColor: PropTypes.string,
  modifiedVersion: PropTypes.bool,
  box: PropTypes.bool,
};

RadioButtonRN.defaultProps = {
  style: {},
  boxStyle: {},
  textStyle: {},
  initial: -1,
  circleSize: 18,
  duration: 0,
  data: [],
  animationTypes: [],
  selectedBtn: () => {},
  activeColor: '#C84648',
  deactiveColor: 'grey',
  boxActiveBgColor: '#e1f5fe33',
  boxDeactiveBgColor: '#fff',
  textColor: '#383838',
  modifiedVersion: false,
  box: true,
};

/* Export Component ============================ */
export default RadioButtonRN;
