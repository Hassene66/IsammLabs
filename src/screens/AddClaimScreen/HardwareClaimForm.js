import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {AppForm, AppFormField, SubmitButton} from '../../Components/forms';
import Title from '../../Components/Title';
import * as Yup from 'yup';
import RadioButton from '../../Components/RadioButton';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import {useNavigation} from '@react-navigation/native';
import claimService from '../../Services/claimService';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import storage from '../../Utils/asyncStorage';
import routes from '../../Navigations/routes';
import computerService from '../../Services/computerService';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Veuillez indiquer le titre'),
  description: Yup.string().required('Veuillez indiquer la description'),
});

const data = [
  {
    id: 1,
    label: 'En marche',
    value: 'En marche',
  },
  {
    id: 2,
    label: 'En panne',
    value: 'En panne',
  },
];

const HardwareClaimForm = ({values}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    storage
      .getItem('user')
      .then(user => {
        setUser(user);
      })
      .catch(() =>
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erreur',
          textBody: "Une erreur s'est produite",
          autoClose: 3000,
        }),
      );
  }, []);

  const handleSubmit = formValues => {
    //
    claimService
      .addClaimApi({
        ...formValues,
        ...{
          createdBy: user._id,
          labo: values.laboratoire._id,
          bloc: values.bloc._id,
          computer: values.ordinateur._id,
          assignedTo: values.technicien.id,
        },
      })
      .then(({data: claim}) =>
        computerService.updateComputerApi(claim.computer, {
          isWorking: claim.state === 'En marche' ? true : false,
        }),
      )
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
            state: data[0].label,
            title: '',
            description: '',
            type: 'hardware',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <View style={{flex: 1, margin: 20}}>
            <View style={styles.card}>
              <Title
                text="Formulaire de réclamation"
                titleStyle={{fontSize: 18}}
              />
              <RadioButton data={data} name="state" />
              <AppFormField name="title" placeholder="titre" />
              <AppFormField name="description" placeholder="description" />
              <SubmitButton title="envoyer" style={{marginTop: 20}} />
            </View>
          </View>
        </AppForm>
      </MyActivityIndicator>
    </ScrollView>
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
