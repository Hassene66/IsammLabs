import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import CardItem from './CardItem';

const LabsInfoScreen = () => {
  const data = [
    {
      _id: 1,
      PcName: 'pc1',
      state: 'En marche',
      block: 'Block A',
      labName: 'Lab 21',
      caracteristic: {
        ip: '192.168.1.34',
        os: 'windows 10',
        processor: 'Intel i5 35552u',
        ram: 8,
        graphicCard: 'Nvidea Gt 620',
        storage: '1 Tb',
      },
      softwareInstalled: ['java', 'kotlin', 'python', 'react', 'C#'],
    },
    {
      _id: 2,
      PcName: 'pc2',
      state: 'En Panne',
      block: 'Block C',
      labName: 'Lab 3',
      caracteristic: {
        ip: '192.168.1.154',
        os: 'macOS',
        processor: 'Intel i3 35552u',
        ram: 8,
        graphicCard: 'Nvidea Gt 270',
        storage: '500 Gb',
      },
      softwareInstalled: [
        'Android studio',
        'python',
        'Node.js',
        'Angular',
        'C++',
      ],
    },
  ];

  const [PcData, setPcData] = useState(data);
  return (
    <FlatList
      data={PcData}
      keyExtractor={el => el._id.toString()}
      renderItem={({item, index}) => <CardItem key={index} item={item} />}
    />

    // <CardItem data={data[0]} />
  );
};

export default LabsInfoScreen;
