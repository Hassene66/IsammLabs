import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Picker from '../../Components/Picker';
import {AppForm, SubmitButton} from '../../Components/forms';
import RadioButtonListing from '../../Components/RadioButtonListing';
import * as Yup from 'yup';
import routes from '../../Navigations/routes';
import axios from 'axios';

const list = [
  {id: 1, label: 'Hassene'},
  {id: 2, label: 'Marouene'},
  {id: 3, label: 'Mohsen'},
  {id: 4, label: 'Amel'},
  {id: 5, label: 'Nizar'},
  {id: 6, label: 'Karim'},
];

const labos = [
  {id: 1, label: 'PC 1', checked: false},
  {id: 2, label: 'PC 2', checked: false},
  {id: 3, label: 'PC 3', checked: false},
  {id: 4, label: 'PC 4', checked: false},
  {id: 5, label: 'PC 5', checked: false},
  {id: 6, label: 'PC 6', checked: false},
  {id: 7, label: 'PC 7', checked: false},
  {id: 8, label: 'PC 8', checked: false},
  {id: 9, label: 'PC 9', checked: false},
  {id: 10, label: 'PC 10', checked: false},
  {id: 11, label: 'PC 11', checked: false},
  {id: 12, label: 'PC 12', checked: false},
  {id: 13, label: 'PC 13', checked: false},
];
const AddClaimScreen = ({navigation: {navigate}}) => {
  const [techniciens, setTechniciens] = useState([]);
  console.log('techniciens: ', techniciens);

  const validationSchema = Yup.object().shape({
    bloc: Yup.object()
      .nullable()
      .required('Veuillez indiquer le bloc')
      .label('Bloc'),
    laboratoire: Yup.object()
      .nullable()
      .required('Veuillez indiquer le laboratoire')
      .label('Laboratoire'),
    ordinateurs: Yup.array()
      .min(1, 'Veuillez sélectionner au moins un PC')
      .label('Ordinateurs'),
    technicien: Yup.object()
      .nullable()
      .required('Veuillez indiquer le technicien')
      .label('Technicien'),
  });
  const handleSubmit = values => {
    navigate(routes.ADD_CLAIM_SECOND, values);
  };
  useEffect(() => {
    axios
      .get('http://172.30.218.59:5000/api/users', {
        params: {role: 'technicien'},
      })
      .then(({data}) => {
        setTechniciens(data.map(t => ({id: t._id, label: t.fullname})));
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <View style={{marginHorizontal: 20}}>
      <AppForm
        validationSchema={validationSchema}
        initialValues={{
          bloc: null,
          laboratoire: null,
          ordinateurs: [],
          technicien: null,
        }}
        onSubmit={handleSubmit}>
        <RadioButtonListing placeholder="bloc" name="bloc" list={labos} />
        <RadioButtonListing
          placeholder="laboratoire"
          name="laboratoire"
          list={labos}
        />
        <Picker
          placeholder="liste des ordinateurs"
          name="ordinateurs"
          list={labos}
        />
        <RadioButtonListing
          placeholder="technicien"
          name="technicien"
          list={techniciens}
        />
        <SubmitButton style={styles.SubmitButton} title="Procéder" />
      </AppForm>
    </View>
  );
};

export default AddClaimScreen;

const styles = StyleSheet.create({
  SubmitButton: {marginTop: 20},
});
