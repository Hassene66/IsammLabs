import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppForm, AppFormField} from '../../Components/forms';
import * as Yup from 'yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {useFormikContext} from 'formik';
import color from '../../Config/color';
const CharacteristicsForm = ({name, innerRef}) => {
  const {setFieldValue} = useFormikContext();
  const handleSubmit = values => {
    setFieldValue(name, values);
  };
  const validationSchema = Yup.object().shape({
    pc: Yup.string().required("Veuillez indiquer l'ordinateur"),
    ip: Yup.string()
      .required("Veuillez indiquer l'ip")
      .matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
        message: 'Adresse IP invalide',
        excludeEmptyString: true,
      })
      .test(
        'ipAddress',
        "La valeur de l'adresse IP doit être inférieure ou égale à 255",
        value => {
          if (value === undefined || value.trim() === '') return true;
          return value.split('.').find(i => parseInt(i) > 255) === undefined;
        },
      ),
    cpu: Yup.string().required('Veuillez indiquer le cpu'),
    gpu: Yup.string().required('Veuillez indiquer le gpu'),
    ram: Yup.string().required('Veuillez indiquer ram'),
    storage: Yup.string().required('Veuillez indiquer disque'),
  });

  return (
    <AppForm
      initialValues={{
        pc: '',
        ip: '',
        cpu: '',
        gpu: '',
        ram: '',
        storage: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      innerRef={innerRef}>
      <View style={styles.formContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '48%'}}>
            <AppFormField
              icon={() => (
                <FontAwesome name="desktop" size={21} color={color.medium} />
              )}
              name="pc"
              placeholder="pc"
              autoCapitalize="characters"
            />
          </View>
          <View style={{width: '48%'}}>
            <AppFormField
              icon={() => (
                <MaterialCommunityIcons
                  name="ip-outline"
                  size={23}
                  color={color.medium}
                />
              )}
              name="ip"
              placeholder="ip"
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '48%'}}>
            <AppFormField
              icon={() => <Feather name="cpu" size={21} color={color.medium} />}
              name="cpu"
              placeholder="cpu"
            />
          </View>
          <View style={{width: '48%'}}>
            <AppFormField
              icon={() => (
                <FontAwesome5 name="memory" size={21} color={color.medium} />
              )}
              name="ram"
              placeholder="ram"
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '48%'}}>
            <AppFormField
              icon={() => (
                <MaterialCommunityIcons
                  name="expansion-card-variant"
                  size={27}
                  color={color.medium}
                />
              )}
              name="gpu"
              placeholder="gpu"
            />
          </View>
          <View style={{width: '48%'}}>
            <AppFormField
              icon={() => (
                <MaterialCommunityIcons
                  name="harddisk"
                  size={23}
                  color={color.medium}
                />
              )}
              name="storage"
              placeholder="disque"
            />
          </View>
        </View>
      </View>
    </AppForm>
  );
};

export default CharacteristicsForm;

const styles = StyleSheet.create({
  formContainer: {
    padding: 5,
  },
});
