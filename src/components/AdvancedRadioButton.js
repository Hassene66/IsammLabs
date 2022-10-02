import React, {useState, useEffect, useRef, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {filter} from 'smart-array-filter/src';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ErrorMessage from './forms/ErrorMessage';
import {useFormikContext} from 'formik';
import ItemRadioBtn from './ItemRadioBtn';
import color from '../Config/color';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import Title from './Title';
import uuid from 'react-native-uuid';
import softwareService from '../Services/softwareService';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import defaultStyles from '../Config/styles';

const AdvancedRadioButton = ({
  placeholder = 'Liste',
  list = [],
  name,
  style = {},
  getSelectedItem = () => {},
  setReload = () => {},
}) => {
  const refRBSheet = useRef();
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const {setFieldValue, errors, touched} = useFormikContext();
  const onSelectItem = item => {
    setSelectedItem(item);
    getSelectedItem(item);
  };

  let filteredData = useMemo(
    () =>
      filter(list, {
        keywords: `label:${searchTerm}`,
        caseSensitive: false,
      }).sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }),
    [list, searchTerm],
  );

  const addNewSoftware = () => {
    softwareService
      .addSoftwareApi({name: searchTerm})
      .then(() => {
        setSearchTerm('');
        setReload(prev => prev + 1);
      })

      .catch(error => {
        if (error.response?.data?.message.substring?.(43)) {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Erreur',
            textBody: error.response?.data?.message.substring?.(34),
            autoClose: 3000,
          });
        } else {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Erreur',
            textBody:
              "Une erreur s'est produite lors de l'exécution de l'opération",
            autoClose: 3000,
          });
        }
      });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => refRBSheet.current.open()}>
        <View
          style={[
            styles.container,
            errors[name] && touched[name] && styles.error,
            style,
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
              <TouchableOpacity onPress={addNewSoftware}>
                <View style={styles.soumettreBtn}>
                  <LinearGradient
                    colors={['#0ecf85', '#9aedbc']}
                    start={{x: 0, y: 1}}
                    end={{x: 1, y: 0}}
                    style={styles.linearGradient}>
                    <Text style={[styles.btn, {color: 'white'}]}>Ajouter</Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
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
            <TextInput
              placeholder="filtrer / ajouter "
              color="#999999"
              placeholderTextColor="#999999"
              style={styles.textInput}
              onChangeText={inputValue => setSearchTerm(inputValue)}
              value={searchTerm}
            />
            <ItemRadioBtn
              data={filteredData}
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

export default AdvancedRadioButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 5,
    width: '100%',
    borderRadius: 5,
    backgroundColor: color.white,
    alignSelf: 'center',
    height: 61,
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
    fontSize: 16,
    fontFamily: 'System',
    color: 'black',
  },
  Placeholder: {
    paddingLeft: 5,
    fontSize: defaultStyles.Text.fontSize,
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
    marginHorizontal: 2,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  textInput: {
    textAlign: 'left',
    fontSize: 15,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: color.green,
    borderRadius: 5,
    marginVertical: 10,
  },
});
