import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {AppForm, AppFormField, SubmitButton} from '../../Components/forms';
import Title from '../../Components/Title';
import * as Yup from 'yup';
import RadioButtonListing from '../../Components/RadioButtonListing';
import color from '../../Config/color';
import storage from '../../Utils/asyncStorage';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import claimService from '../../Services/claimService';
import routes from '../../Navigations/routes';
import OsSwitchSelector from '../../Components/OsSwitchSelector';
import osOptions from '../../Utils/osOptions';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Veuillez indiquer le titre'),
  toUpdateSoftware: Yup.object()
    .nullable()
    .required('Veuillez indiquer le logiciel à mettre à jour'),
  description: Yup.string().required('Veuillez indiquer la description'),
});

const SoftwareUpdateForm = ({values}) => {
  const [softwareList, setSoftwareList] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedSwitch, setSelectedSwitch] = useState(osOptions[0].value);
  const navigation = useNavigation();

  useEffect(() => {
    storage
      .getItem('user')
      .then(async user => {
        setUser(user);
        return values?.ordinateur[selectedSwitch] || [];
      })
      .then(data => {
        setSoftwareList(
          data.map(software => ({...software, label: software?.name})),
        );
      })
      .catch(e => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erreur',
          textBody:
            "Une erreur s'est produite lors de l'exécution de l'opération",
          autoClose: 3000,
        });
      });
  }, [selectedSwitch]);

  const handleSwitchChange = value => {
    setSelectedSwitch(value);
  };

  const handleSubmit = formValues => {
    setLoading(true);
    claimService
      .addClaimApi({
        ...formValues,
        ...{
          createdBy: user._id,
          labo: values.laboratoire._id,
          bloc: values.bloc._id,
          computer: values.ordinateur._id,
          assignedTo: values.technicien.id,
          toUpdateSoftware: formValues?.toUpdateSoftware?._id,
        },
      })
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: routes.ACCEUIL,
            },
          ],
        });
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Succès',
          textBody: 'La réclamation a été envoyée avec succès',
          button: 'fermer',
          autoClose: 3000,
        });
      })
      .catch(() => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erreur',
          textBody:
            "Une erreur s'est produite lors de l'exécution de l'opération",
          autoClose: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MyActivityIndicator loading={loading}>
        <AppForm
          initialValues={{
            title: '',
            toUpdateSoftware: null,
            installedIn: osOptions[0].value,
            description: '',
            type: 'updateSoftware',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <View style={styles.formContainer}>
            <Title
              text="Formulaire de réclamation"
              titleStyle={styles.formTitleStyle}
            />
            <AppFormField name="title" placeholder="titre" />
            <AppFormField name="description" placeholder="description" />
            <Text style={styles.osLabel}>Installé sur :</Text>
            <OsSwitchSelector
              name="installedIn"
              getSelectedItem={handleSwitchChange}
            />
            <RadioButtonListing
              placeholder="logicielle"
              name="toUpdateSoftware"
              list={softwareList}
              style={styles.RadioButton}
            />
            <SubmitButton title="Envoyer" style={styles.SubmitButton} />
          </View>
        </AppForm>
      </MyActivityIndicator>
    </ScrollView>
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
    paddingVertical: 18,
  },
  RadioButton: {
    backgroundColor: color.white,
  },
  osLabel: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
    color: color.medium,
  },
});
