import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import CardItem from '../../Components/CardItem';

const LabsInfoScreen = ({route}) => {
  const {label, computer} = route?.params;
  return (
    <FlatList
      data={computer}
      keyExtractor={el => el._id.toString()}
      renderItem={({item, index}) => (
        <CardItem key={index} item={item} block={label} />
      )}
    />
  );
};

export default LabsInfoScreen;
