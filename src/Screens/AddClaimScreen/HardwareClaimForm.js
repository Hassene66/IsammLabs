import {StyleSheet, View} from 'react-native';
import React from 'react';
import color from '../../Config/color';
import {AppForm, AppFormField, SubmitButton} from '../../Components/forms';
import Title from '../../Components/Title';
import * as Yup from 'yup';
import RadioButton from '../../Components/RadioButton';

const HardwareClaimForm = () => {
  const data = [
    {
      id: 1,
      label: 'En marche',
    },
    {
      id: 2,
      label: 'En panne',
    },
  ];
  const handleSubmit = values => {
    console.log(values);
  };
  const validationSchema = Yup.object().shape({
    titre: Yup.string().required('Veuillez indiquer le titre'),
    etat: Yup.object().nullable().required("Veuillez indiquer le l'etat"),
    description: Yup.string().required('Veuillez indiquer la description'),
  });
  return (
    <AppForm
      initialValues={{etat: data[0], titre: '', description: ''}}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      <View style={{flex: 1, margin: 20}}>
        <View style={styles.card}>
          <Title text="Formulaire de réclamation" titleStyle={{fontSize: 18}} />
          <RadioButton data={data} name="etat" />
          <AppFormField name="titre" placeholder="titre" />
          <AppFormField name="description" placeholder="description" />
          <SubmitButton title="envoyer" style={{marginTop: 20}} />
        </View>
      </View>
    </AppForm>
  );
};

export default HardwareClaimForm;

const styles = StyleSheet.create({
  RadioButtonStyle: {flexDirection: 'row', marginVertical: 7},
  boxStyle: {flex: 1, marginHorizontal: 5},
  card: {
    flex: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 8,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
  },
});
