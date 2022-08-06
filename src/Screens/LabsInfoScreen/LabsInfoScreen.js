import React from 'react';
import {useNavigation} from '@react-navigation/native';
import routes from '../../Navigations/routes';
import {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import CardItem from '../../Components/CardItem';

const LabsInfoScreen = ({route}) => {
  const pcData = route?.params;

  const [PcData, setPcData] = useState(pcData);
  return (
    <FlatList
      data={PcData.computer}
      keyExtractor={el => el._id.toString()}
      renderItem={({item, index}) => (
        <CardItem key={index} item={item} block={PcData?.label} />
      )}
    />

    // <CardItem data={data[0]} />
  );
};

export default LabsInfoScreen;
