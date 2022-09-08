import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ErrorMessage from './forms/ErrorMessage';
import {useFormikContext} from 'formik';
import ItemRadioBtn from './ItemRadioBtn';
import color from '../Config/color';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import Title from './Title';
import uuid from 'react-native-uuid';

const RadioButtonListing = ({
  placeholder = 'Liste',
  list = [],
  name,
  style = {},
  getSelectedItem = () => {},
}) => {
  const refRBSheet = useRef();
  const [selectedItem, setSelectedItem] = useState(undefined);
  const {setFieldValue, errors, touched} = useFormikContext();
  const onSelectItem = item => {
    setSelectedItem(item);
    getSelectedItem(item);
  };
  useEffect(() => {
    setSelectedItem(undefined);
    setFieldValue(name, null, false);
  }, [list]);
  return (
    <>
      <TouchableWithoutFeedback
        disabled={!!!list.length}
        onPress={() => refRBSheet.current.open()}>
        <View
          style={[
            styles.container,
            errors[name] && touched[name] && styles.error,
            style,
            {backgroundColor: !!!list.length ? color.lighter : 'white'},
          ]}>
          {[
            selectedItem && (
              <Text key={uuid.v4()} style={styles.title}>
                {placeholder}
              </Text>
            ),
            selectedItem ? (
              <Text key={uuid.v4()} style={styles.subTitle}>
                {selectedItem.label}
              </Text>
            ) : (
              <Text key={uuid.v4()} style={styles.Placeholder}>
                {placeholder}
              </Text>
            ),
          ]}
          <MaterialCommunityIcons
            style={styles.icon}
            name="chevron-down"
            size={23}
          />
        </View>
      </TouchableWithoutFeedback>
      <ErrorMessage error={errors[name]} visible={touched[name]} />

      <View>
        <RBSheet
          ref={refRBSheet}
          closeOnPressMask
          animationType="fade"
          closeOnDragDown
          height={useWindowDimensions().height / 2}
          customStyles={styles.bottomSheet}>
          <View style={styles.list}>
            <View style={styles.modalHeader}>
              <Title
                text={` liste des ${placeholder}s`}
                titleStyle={styles.titleStyle}
              />
              <TouchableOpacity onPress={() => refRBSheet.current.close()}>
                <View style={styles.soumettreBtn}>
                  <LinearGradient
                    colors={['#0E94CF', '#8DCBCB']}
                    start={{x: 0, y: 1}}
                    end={{x: 1, y: 0}}
                    style={styles.linearGradient}>
                    <Text style={[styles.btn, {color: 'white'}]}>
                      Soumettre
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
            <ItemRadioBtn
              name={name}
              title={placeholder}
              data={list.sort(function (a, b) {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              })}
              initial={-1}
              onPress={item => {
                setFieldValue(name, item);
                onSelectItem(item);
              }}
            />
          </View>
        </RBSheet>
      </View>
    </>
  );
};

export default RadioButtonListing;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    borderRadius: 5,
    backgroundColor: color.white,
    alignSelf: 'center',
    height: 65,
    padding: 7,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.green,
  },
  title: {
    paddingLeft: 11,
    fontSize: 11,
    fontFamily: 'System',
    color: color.primary,
    marginBottom: 3,
  },
  subTitle: {
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: 'System',
    color: 'black',
  },
  Placeholder: {
    paddingLeft: 5,
    fontSize: 15,
    fontFamily: 'System',
    color: color.medium,
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: 15,
    color: color.green,
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
    marginTop: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    height: '99%',
    overflow: 'hidden',
  },
  titleStyle: {
    marginVertical: 20,
    fontSize: 18,
    flex: 1,
    color: color.primary,
  },
  btn: {
    fontFamily: 'System',
    fontSize: 12,
  },
  textInput: {
    fontFamily: 'System',
    textAlign: 'right',
    fontSize: 17,
    paddingLeft: 20,
  },
  bottomSheet: {
    wrapper: {
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    container: {
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
  },
  modalHeader: {
    flexDirection: 'row',
    marginTop: 15,
    display: 'flex',
    alignItems: 'center',
  },
  soumettreBtn: {
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
