import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppForm, AppFormField, SubmitButton} from '../../Components/forms';
import Title from '../../Components/Title';
import * as Yup from 'yup';
import axios from 'axios';
import storage from '../../Utils/asyncStorage';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const NewSoftwareForm = ({values}) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  console.log('values: ', values);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Veuillez indiquer le titre'),
    toAddSoftware: Yup.string().required('Veuillez indiquer le logicielle'),
    description: Yup.string().required('Veuillez indiquer la description'),
  });
  useEffect(() => {
    storage
      .getItem('user')
      .then(user => setUser(user))
      .catch(err => console.log(err));
  }, []);
  const handleSubmit = formValues => {
    setLoading(true);
    axios
      .post('http://172.30.208.93:5000/api/claim', {
        ...formValues,
        ...{
          claimType: 'software',
          createdBy: user._id,
          labo: values.laboratoire._id,
          bloc: values.bloc._id,
          computer: values.ordinateur._id,
          assignedTo: values.technicien.id,
        },
      })
      .then(() => {
        showMessage({
          message: 'réclamation été ajoutée avec succès',
          type: 'success',
          icon: 'auto',
          duration: 2500,
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={{flex: 1}}>
      <AppForm
        initialValues={{titre: '', logicielle: '', description: ''}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <View style={styles.formContainer}>
          <Title
            text="Formulaire de réclamation"
            titleStyle={styles.formTitleStyle}
          />
          <AppFormField name="title" placeholder="titre" />
          <AppFormField name="toAddSoftware" placeholder="logicielle" />
          <AppFormField name="description" placeholder="description" />
          <SubmitButton title="Envoyer" style={styles.SubmitButton} />
        </View>
      </AppForm>
      <FlashMessage position="top" />
    </View>
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
