import {StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import uuid from 'react-native-uuid';
import ClaimsCard from './ClaimsCard';
import storage from '../../Utils/asyncStorage';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import axios from '../../Utils/axios';
import {View, Text} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
const ClaimsList = () => {
  const [loading, setLoading] = useState(true);
  const [claims, setClaims] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    storage
      .getItem('user')
      .then(user => {
        return axios.get('/api/claim', {
          params: {
            assignedTo: user._id,
            status: 'unprocessed',
          },
        });
      })
      .then(({data}) => setClaims(data))
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [isFocused]);
  return (
    <MyActivityIndicator loading={loading}>
      {!loading &&
        (!!claims.length ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={claims}
            keyExtractor={() => uuid.v4()}
            renderItem={({item}) => <ClaimsCard data={item} />}
          />
        ) : (
          <View style={styles.messageContainer}>
            <Text style={styles.text}>Aucune réclamation à traiter</Text>
          </View>
        ))}
    </MyActivityIndicator>
  );
};
export default ClaimsList;

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {textAlign: 'center', fontWeight: '700', fontSize: 16},
});
