import {StyleSheet, View} from 'react-native';
import React from 'react';
import {AppForm, AppFormField, SubmitButton} from '../../Components/forms';
import Title from '../../Components/Title';
import * as Yup from 'yup';
import RadioButtonListing from '../../Components/RadioButtonListing';
import color from '../../Config/color';

const SoftwareUpdateForm = () => {
  const validationSchema = Yup.object().shape({
    titre: Yup.string().required('Veuillez indiquer le titre'),
    logicielle: Yup.object()
      .nullable()
      .required('Veuillez indiquer le logicielle'),
    description: Yup.string().required('Veuillez indiquer la description'),
  });
  const handleSubmit = values => {
    console.log(values);
  };

  const list = [
    {id: 1, label: 'Python'},
    {id: 2, label: 'Kotlin'},
    {id: 3, label: 'Postman'},
    {id: 4, label: 'VS code'},
    {id: 5, label: 'Eclipse'},
    {id: 6, label: 'Mongodb'},
  ];

  return (
    <View>
      <AppForm
        initialValues={{titre: '', logicielle: null, description: ''}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <View style={styles.formContainer}>
          <Title
            text="Formulaire de réclamation"
            titleStyle={styles.formTitleStyle}
          />
          <AppFormField name="titre" placeholder="titre" />
          <RadioButtonListing
            placeholder="logicielle"
            name="logicielle"
            list={list}
            style={styles.RadioButton}
          />
          <AppFormField name="description" placeholder="description" />
          <SubmitButton title="Envoyer" style={styles.SubmitButton} />
        </View>
      </AppForm>
    </View>
  );
};

export default SoftwareUpdateForm;

const styles = StyleSheet.create({
  formTitleStyle: {
    fontSize: 20,
  },
  formContainer: {
    margin: 10,
  },
  SubmitButton: {
    marginTop: 20,
    paddingVertical: 18,
  },
  RadioButton: {
    backgroundColor: color.light,
  },
});
