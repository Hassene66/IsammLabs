import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppForm, AppFormField} from '../../Components/forms';
import * as Yup from 'yup';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const CharacteristicsForm = () => {
  const handleSubmit = values => {
    console.log(values);
  };
  const validationSchema = Yup.object().shape({
    ordinateur: Yup.string().required("Veuillez indiquer l'ordinateur"),
    ip_address: Yup.string().required("Veuillez indiquer l'ip"),
    os: Yup.string().required("Veuillez indiquer l'os"),
    cpu: Yup.string().required('Veuillez indiquer le cpu'),
    gpu: Yup.string().required('Veuillez indiquer le gpu'),
    ram: Yup.string().required('Veuillez indiquer ram'),
    disk_space: Yup.string().required('Veuillez indiquer disque'),
  });

  return (
    <AppForm
      initialValues={{
        ordinateur: '',
        ip_address: '',
        os: '',
        cpu: '',
        gpu: '',
        ram: '',
        disk_space: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      <View style={styles.formContainer}>
        <AppFormField
          icon={() => <FontAwesome name="desktop" size={21} />}
          name="ordinateur"
          placeholder="pc"
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '48%'}}>
            <AppFormField
              icon={() => <FontAwesome name="tasks" size={21} />}
              name="ip_address"
              placeholder="ip"
            />
          </View>
          <View style={{width: '48%'}}>
            <AppFormField
              icon={() => <FontAwesome name="download" size={21} />}
              name="os"
              placeholder="os"
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '48%'}}>
            <AppFormField
              icon={() => <Feather name="cpu" size={21} />}
              name="cpu"
              placeholder="cpu"
            />
          </View>
          <View style={{width: '48%'}}>
            <AppFormField
              icon={() => <FontAwesome name="microchip" size={21} />}
              name="ram"
              placeholder="ram"
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '48%'}}>
            <AppFormField
              icon={() => <Feather name="cpu" size={21} />}
              name="gpu"
              placeholder="gpu"
            />
          </View>
          <View style={{width: '48%'}}>
            <AppFormField
              icon={() => <FontAwesome name="hdd-o" size={21} />}
              name="disk_space"
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
