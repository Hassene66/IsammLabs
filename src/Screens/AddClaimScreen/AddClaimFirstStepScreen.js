import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {ALERT_TYPE, Dialog, Root} from 'react-native-alert-notification';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {AppForm, SubmitButton} from '../../Components/forms';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import RadioButtonListing from '../../Components/RadioButtonListing';
import routes from '../../Navigations/routes';
import axios from '../../Utils/axios';
import color from '../../Config/color';
import {ScrollView} from 'react-native-gesture-handler';
import userService from '../../Services/userService';
import blocService from '../../Services/blocService';

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
  const [blocs, setBlocs] = useState([]);
  const [selectedBloc, setSelectedBloc] = useState([]);
  const [selectedLaboratory, setSelectedLaboratory] = useState([]);
  const [, setSelectedComputer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetech] = useState(0);

  const validationSchema = Yup.object().shape({
    bloc: Yup.object()
      .nullable()
      .required('Veuillez indiquer le bloc')
      .label('Bloc'),
    laboratoire: Yup.object()
      .nullable()
      .required('Veuillez indiquer le laboratoire')
      .label('Laboratoire'),
    ordinateur: Yup.object()
      .nullable()
      .required("Veuillez indiquer l'ordinateur")
      .label('Ordinateur'),
    technicien: Yup.object()
      .nullable()
      .required('Veuillez indiquer le technicien')
      .label('Technicien'),
  });
  const handleSubmit = values => {
    navigate(routes.ADD_CLAIM_SECOND, {values});
  };
  useEffect(() => {
    setLoading(true);
    userService
      .getAllUserApi({role: 'technicien', isAvailable: true})
      .then(({data}) => {
        setTechniciens(data.map(t => ({id: t._id, label: t.fullname})));
        return blocService.getAllBlocsApi();
      })
      .then(({data}) => {
        setBlocs(data);
      })
      .then(() => Dialog.hide())
      .catch(() => {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erreur',
          textBody: 'échec de la récupération des données du serveur',
          button: 'réessayez',
          closeOnOverlayTap: false,
          onPressButton: () => {
            setRefetech(prevState => prevState + 1);
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetch]);
  return (
    <>
      <ScrollView>
        <Root
          theme="light"
          colors={[
            {
              danger: color.primary,
              card: 'white',
              overlay: 'black',
              label: 'black',
            },
          ]}>
          <MyActivityIndicator loading={loading}>
            <View style={styles.container}>
              <AppForm
                validationSchema={validationSchema}
                initialValues={{
                  bloc: null,
                  laboratoire: null,
                  ordinateur: null,
                  technicien: null,
                }}
                onSubmit={handleSubmit}>
                <RadioButtonListing
                  getSelectedItem={setSelectedBloc}
                  placeholder="bloc"
                  name="bloc"
                  list={blocs}
                />
                <RadioButtonListing
                  getSelectedItem={setSelectedLaboratory}
                  placeholder="laboratoire"
                  name="laboratoire"
                  list={selectedBloc?.labs || []}
                />
                <RadioButtonListing
                  getSelectedItem={setSelectedComputer}
                  placeholder="ordinateur"
                  name="ordinateur"
                  list={selectedLaboratory?.computer || []}
                />

                <RadioButtonListing
                  placeholder="technicien"
                  name="technicien"
                  list={techniciens}
                />
                <SubmitButton style={styles.SubmitButton} title="Procéder" />
              </AppForm>
            </View>
          </MyActivityIndicator>
        </Root>
      </ScrollView>
    </>
  );
};

export default AddClaimScreen;

const styles = StyleSheet.create({
  container: {marginHorizontal: 20},
  SubmitButton: {marginTop: 20},
});
