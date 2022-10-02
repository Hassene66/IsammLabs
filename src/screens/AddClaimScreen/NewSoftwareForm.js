import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {AppForm, AppFormField, SubmitButton} from '../../Components/forms';
import Title from '../../Components/Title';
import * as Yup from 'yup';
import storage from '../../Utils/asyncStorage';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import routes from '../../Navigations/routes';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import claimService from '../../Services/claimService';
import softwareService from '../../Services/softwareService';
import AdvancedRadioButton from '../../Components/AdvancedRadioButton';
import osOptions from '../../Utils/osOptions';
import OsSwitchSelector from '../../Components/OsSwitchSelector';
import color from '../../Config/color';

const NewSoftwareForm = ({values}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [softwareList, setSoftwareList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Veuillez indiquer le titre'),
    toAddSoftware: Yup.object()
      .nullable()
      .required('Veuillez indiquer le logiciel à installer '),
    description: Yup.string().required('Veuillez indiquer la description'),
  });
  useEffect(() => {
    storage
      .getItem('user')
      .then(user => {
        setUser(user);
        return softwareService.getAllSoftwaresApi();
      })
      .then(({data}) => {
        setSoftwareList(
          data.map(software => ({...software, label: software?.name})),
        );
      })
      .catch(() =>
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erreur',
          textBody:
            "Une erreur s'est produite lors de l'exécution de l'opération",
          autoClose: 3000,
        }),
      );
  }, [reload]);
  const handleSubmit = formValues => {
    setLoading(true);
    claimService
      .addClaimApi({
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
            toAddSoftware: null,
            description: '',
            installedIn: osOptions[0].value,
            type: 'newSoftware',
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
            <AdvancedRadioButton
              placeholder="logiciel"
              name="toAddSoftware"
              list={softwareList}
              setReload={setReload}
            />
            <Text style={styles.osLabel}>Sera installé sur :</Text>
            <OsSwitchSelector name="installedIn" />
            <SubmitButton title="Envoyer" style={styles.SubmitButton} />
          </View>
        </AppForm>
      </MyActivityIndicator>
    </ScrollView>
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
    marginTop: 5,
    paddingVertical: 18,
  },
  icon: {
    marginRight: 5,
  },
  osLabel: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
    color: color.medium,
  },
});
