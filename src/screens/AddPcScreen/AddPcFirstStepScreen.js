import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {AppForm, SubmitButton} from '../../Components/forms';
import RadioButtonListing from '../../Components/RadioButtonListing';
import * as Yup from 'yup';
import routes from '../../Navigations/routes';
import blocService from '../../Services/blocService';
import {ALERT_TYPE, Dialog, Root} from 'react-native-alert-notification';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import color from '../../Config/color';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
const validationSchema = Yup.object().shape({
  bloc: Yup.object()
    .nullable()
    .required('Veuillez indiquer le bloc')
    .label('Bloc'),
  laboratoire: Yup.object()
    .nullable()
    .required('Veuillez indiquer le laboratoire')
    .label('Laboratoire'),
});

const AddPcFirstStepScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [blocs, setBlocs] = useState([]);
  const [selectedBloc, setSelectedBloc] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetech] = useState(0);

  const handleSubmit = values => {
    navigation.navigate(routes.ADD_PC_SECOND, {values});
  };

  useEffect(() => {
    setLoading(true);
    blocService
      .getAllBlocsApi()
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
    <ScrollView>
      <MyActivityIndicator loading={loading}>
        <View style={{marginHorizontal: 20}}>
          <AppForm
            validationSchema={validationSchema}
            initialValues={{
              bloc: null,
              laboratoire: null,
            }}
            onSubmit={handleSubmit}>
            <RadioButtonListing
              placeholder="bloc"
              name="bloc"
              list={blocs}
              getSelectedItem={setSelectedBloc}
            />
            <RadioButtonListing
              placeholder="laboratoire"
              name="laboratoire"
              list={selectedBloc?.labs || []}
            />
            <SubmitButton style={styles.SubmitButton} title="Procéder" />
          </AppForm>
        </View>
      </MyActivityIndicator>
    </ScrollView>
  );
};

export default AddPcFirstStepScreen;

const styles = StyleSheet.create({
  SubmitButton: {marginTop: 20},
});
