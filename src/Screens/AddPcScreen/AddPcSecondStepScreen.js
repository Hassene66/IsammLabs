import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import Title from '../../Components/Title';
import CharacteristicsForm from './CharacteristicsForm';
import AddSoftwareForm from './AddSoftwareForm';
import {FlatList} from 'react-native-gesture-handler';

const AddPcSecondStepScreen = () => {
  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={() => (
        <>
          <Title
            text="Caractéristiques matérielles"
            titleStyle={styles.titleStyle}
          />
          <View style={styles.formContainer}>
            <CharacteristicsForm />
          </View>
          <Title text="Logiciel installé" titleStyle={styles.titleStyle} />
          <View style={styles.formContainer}>
            <AddSoftwareForm />
          </View>
        </>
      )}
    />
  );
};

export default AddPcSecondStepScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 20,
  },
  formContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 8,
    backgroundColor: 'white',
    padding: 10,
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
});
