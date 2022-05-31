import {StyleSheet, View} from 'react-native';
import React from 'react';
import {AppForm, AppFormField, SubmitButton} from '../../Components/forms';
import Title from '../../Components/Title';
import * as Yup from 'yup';

const NewSoftwareForm = () => {
  const validationSchema = Yup.object().shape({
    titre: Yup.string().required('Veuillez indiquer le titre'),
    logicielle: Yup.string().required('Veuillez indiquer le logicielle'),
    description: Yup.string().required('Veuillez indiquer la description'),
  });
  const handleSubmit = values => {
    console.log(values);
  };
  return (
    <AppForm
      initialValues={{titre: '', logicielle: '', description: ''}}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      <View style={styles.formContainer}>
        <Title
          text="Formulaire de réclamation"
          titleStyle={styles.formTitleStyle}
        />
        <AppFormField name="titre" placeholder="titre" />
        <AppFormField name="logicielle" placeholder="logicielle" />
        <AppFormField name="description" placeholder="description" />
        <SubmitButton title="Envoyer" style={styles.SubmitButton} />
      </View>
    </AppForm>
  );
};

export default NewSoftwareForm;

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
});
