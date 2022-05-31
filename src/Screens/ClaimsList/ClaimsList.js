import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import uuid from 'react-native-uuid';
import ClaimsCard from './ClaimsCard';
const Data = [
  {
    id: 1,
    teacher: 'Hassene Ayoub',
    email: 'hassene.ayoub@yahoo.fr',
    claimTitle: 'First Claim',
    claimDetails: 'This is claim details',
    startingDate: '08/02/2022',
    endingDate: '08/02/2022',
    bloc: 'Bloc A',
    pc: ['PC1', 'PC2', 'PC3', 'PC4'],
    labo: 'Labo 3',
  },
  {
    id: 2,
    teacher: 'Marouen Ayoub',
    email: 'marouene.ayoub@yahoo.fr',
    claimTitle: 'Second Claim',
    claimDetails:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elitsed do eiusmod tempor incididunt ut labore et dolor consectetur adipiscing elitsed do',
    startingDate: '08/02/2022',
    endingDate: '10/02/2022',
    bloc: 'Bloc B',
    pc: ['PC1', 'PC2', 'PC3'],
    labo: 'Labo 5',
  },
  {
    id: 3,
    teacher: 'Marouen Ayoub',
    email: 'marouene.ayoub@yahoo.fr',
    claimTitle: 'Second Claim',
    claimDetails:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elitsed do eiusmod tempor incididunt ut labore et dolor consectetur adipiscing elitsed do',
    startingDate: '08/02/2022',
    endingDate: '10/02/2022',
    bloc: 'Bloc B',
    pc: ['PC1', 'PC2', 'PC3'],
    labo: 'Labo 5',
  },
];
const ClaimsList = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={Data}
      keyExtractor={() => uuid.v4()}
      renderItem={({item}) => <ClaimsCard data={item} />}
    />
  );
};
export default ClaimsList;

const styles = StyleSheet.create({});
