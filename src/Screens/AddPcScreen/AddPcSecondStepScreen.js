import React, {useRef, useCallback, useState, useMemo} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import Title from '../../Components/Title';
import CharacteristicsForm from './CharacteristicsForm';
import AddSoftwareForm from './AddSoftwareForm';
import {AppForm, SubmitButton} from '../../Components/forms';
import * as Yup from 'yup';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import computerService from '../../Services/computerService';
import {useNavigation} from '@react-navigation/native';
import routes from '../../Navigations/routes';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import color from '../../Config/color';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const validationSchema = Yup.object().shape({
  characteristics: Yup.object()
    .nullable()
    .required('Veuillez indiquer le characteristics'),
});
const AddPcSecondStepScreen = () => {
  let idsList = useMemo(() => ({}), []);
  const formRef = useCallback(useRef(), []);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    formRef.current.submitForm();
  };

  const handleFormSubmit = async ({characteristics}) => {
    const toSubmitData = {
      label: characteristics?.pc,
      characteristics,
      ...idsList,
    };
    setLoading(true);
    computerService
      .addComputerApi(toSubmitData)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: routes.TO_REPAIR,
            },
          ],
        });
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Succès',
          textBody: 'Le pc a été ajouté avec succès',
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

  const getSelectedIds = selectedIds => {
    idsList = selectedIds;
  };
  return (
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <AppForm
            initialValues={{characteristics: null}}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}>
            <View style={styles.container}>
              <Title
                text="Caractéristiques matérielles"
                titleStyle={styles.titleStyle}
              />
              <CharacteristicsForm innerRef={formRef} name="characteristics" />
              <Title text="Logiciel installé" titleStyle={styles.titleStyle} />
              <AddSoftwareForm
                getSelectedIds={getSelectedIds}
                setLoading={setLoading}
              />
              <SubmitButton
                title="Envoyer"
                style={styles.SubmitButton}
                onSubmit={handleSubmit}
                withSleep
                setLoading={setLoading}
              />
            </View>
          </AppForm>
        </ScrollView>
      </MyActivityIndicator>
    </Root>
  );
};

export default AddPcSecondStepScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  titleStyle: {
    fontSize: 23,
    marginVertical: 10,
  },
  hardwareCard: {
    backgroundColor: 'yellow',
    flexGrow: 1,
  },
  softwareCard: {
    backgroundColor: 'green',
    flexGrow: 1,
  },
  SubmitButton: {marginTop: 10},
});
