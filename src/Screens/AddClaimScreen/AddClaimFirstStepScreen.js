import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {ALERT_TYPE, Dialog, Root} from 'react-native-alert-notification';
import {AppForm, SubmitButton} from '../../Components/forms';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import RadioButtonListing from '../../Components/RadioButtonListing';
import routes from '../../Navigations/routes';
import color from '../../Config/color';
import {ScrollView} from 'react-native-gesture-handler';
import userService from '../../Services/userService';
import blocService from '../../Services/blocService';
import {useIsFocused} from '@react-navigation/native';
const AddClaimScreen = ({navigation: {navigate}}) => {
  const isFocused = useIsFocused();
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
  }, [refetch, isFocused]);
  return (
    <>
      <ScrollView>
        <Root
          theme="light"
          colors={[
            {
              danger: color.primary,
              card: color.lightBlue,
              overlay: 'black',
              label: 'black',
              success: color.primary,
              warning: color.primary,
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
