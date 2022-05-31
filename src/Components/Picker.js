import React, {useState, useRef, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ErrorMessage from './forms/ErrorMessage';
import LinearGradient from 'react-native-linear-gradient';
import {useFormikContext} from 'formik';
import Title from './Title';
import CheckBox from 'react-native-check-box';
import color from '../Config/color';
import RBSheet from 'react-native-raw-bottom-sheet';
import uuid from 'react-native-uuid';

const Picker = ({placeholder = 'Liste', list = [], name}) => {
  const refRBSheet = useRef();
  const [data, setData] = useState(list);
  const {setFieldValue, errors, values, touched} = useFormikContext();
  const getSelectedData = () => data.filter(el => el.checked);
  const handleCheck = id => {
    return data.map(el => {
      if (el.id === id) return {...el, checked: !el.checked};
      return el;
    });
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => refRBSheet.current.open()}>
        <View style={[styles.container, errors[name] && styles.error]}>
          {[
            getSelectedData().length !== 0 && (
              <Text key={uuid.v4()} style={styles.title}>
                {placeholder}
              </Text>
            ),
            getSelectedData().length === 0 ? (
              <Text key={uuid.v4()} style={styles.Placeholder}>
                {placeholder}
              </Text>
            ) : (
              <View style={styles.pickerContainer}>
                <Text numberOfLines={1} style={[styles.subTitle]}>
                  {getSelectedData().map(el => (
                    <Fragment key={uuid.v4()}>{el.label + ' ,'}</Fragment>
                  ))}
                </Text>
              </View>
            ),
          ]}
          <MaterialCommunityIcons
            style={styles.icon}
            name="chevron-right"
            size={23}
          />
        </View>
      </TouchableWithoutFeedback>
      <ErrorMessage error={errors[name]} visible={touched[name]} />

      <View>
        <RBSheet
          ref={refRBSheet}
          closeOnPressMask={false}
          animationType="fade"
          closeOnDragDown
          height={useWindowDimensions().height / 2}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.2)',
            },
            container: {
              borderRadius: 20,
            },
          }}>
          <View style={styles.list}>
            <View style={styles.modalHeader}>
              <Title
                text={`Liste des ${name}`}
                titleStyle={styles.titleStyle}
              />
              <TouchableOpacity
                onPress={() => {
                  setData(list);
                  values[name] = [];
                }}>
                <View style={styles.réinitialiser}>
                  <Text style={[styles.btn, {color: 'black'}]}>
                    Réinitialiser
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => refRBSheet.current.close()}>
                <View style={styles.soumettre}>
                  <LinearGradient
                    colors={['#de392c', '#f2a39d']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.linearGradient}>
                    <Text style={[styles.btn, {color: 'white'}]}>
                      Soumettre
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
            <FlatList
              data={data}
              keyExtractor={() => uuid.v4()}
              renderItem={({item}) => (
                <CheckBox
                  key={uuid.v4()}
                  style={{flex: 1, paddingVertical: 10}}
                  rightText={item.label}
                  rightTextStyle={{
                    fontFamily: 'Cairo-SemiBold',
                    fontSize: 17,
                  }}
                  checkedImage={
                    <MaterialIcons
                      name="check-circle"
                      size={25}
                      color={color.primary}
                    />
                  }
                  unCheckedImage={
                    <MaterialIcons
                      name="radio-button-unchecked"
                      size={25}
                      color="#707070"
                    />
                  }
                  onClick={() => {
                    setData(() => handleCheck(item.id));
                    setFieldValue(name, handleCheck(item.id));
                  }}
                  isChecked={item.checked}
                />
              )}
            />
          </View>
        </RBSheet>
      </View>
    </>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    height: 65,
    padding: 7,
    justifyContent: 'center',
  },
  title: {
    paddingLeft: 11,
    fontSize: 11,
    fontFamily: 'Cairo-SemiBold',
    color: color.primary,
    marginBottom: 3,
  },
  subTitle: {
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: 'Cairo-SemiBold',
    color: 'black',
  },
  Placeholder: {
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: 'Cairo-SemiBold',
    color: color.medium,
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: 15,
  },
  modal: {
    margin: 0,
    alignItems: undefined,
    justifyContent: 'flex-end',
  },
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
  list: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
    height: '80%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    overflow: 'hidden',
  },
  titleStyle: {
    marginVertical: 20,
    fontSize: 18,
    flex: 1,
    color: color.primary,
  },
  btn: {
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
  },
  pickerContainer: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'flex-start',
  },
  modalHeader: {
    flexDirection: 'row',
    marginTop: 15,
    display: 'flex',
    alignItems: 'center',
  },
  réinitialiser: {
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
    borderColor: '#707070',
    borderWidth: 2,
  },
  soumettre: {
    height: 45,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
});
