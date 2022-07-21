import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import uuid from 'react-native-uuid';
import ClaimsCard from './ClaimsCard';
import storage from '../../Utils/asyncStorage';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import axios from '../../Utils/axios';
import {View, Text} from 'react-native';
import {Root} from 'react-native-alert-notification';
import {useIsFocused} from '@react-navigation/native';
import color from '../../Config/color';
import {AppForm, SubmitButton} from '../../Components/forms';
const ClaimsList = () => {
  const [loading, setLoading] = useState(true);
  const [claims, setClaims] = useState([]);

  const isFocused = useIsFocused();

  const fetchData = () => {
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
  };
  useEffect(() => {
    fetchData();
  }, [isFocused]);
  return (
    <>
      <AppForm
        initialValues={{
          status: 'unprocessed',
        }}
        onSubmit={() => {}}>
        <MyActivityIndicator loading={loading}>
          <View style={styles.toast}>
            <Root theme="light" />
          </View>
          {!loading &&
            (!!claims.length ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={fetchData}
                    colors={[color.primary]}
                    tintColor={color.primary}
                  />
                }
                showsVerticalScrollIndicator={false}
                data={claims}
                keyExtractor={() => uuid.v4()}
                renderItem={({item}) => <ClaimsCard data={item} />}
              />
            ) : (
              <View style={styles.messageContainer}>
                <Text style={styles.text}>Aucune réclamation à traiter</Text>
                <SubmitButton
                  onSubmit={fetchData}
                  title="Actualiser"
                  style={styles.btnContainer}
                  textStyle={styles.btnText}
                />
              </View>
            ))}
        </MyActivityIndicator>
      </AppForm>
    </>
  );
};
export default ClaimsList;

const styles = StyleSheet.create({
  toast: {margin: 10},
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: color.dark,
  },
  btnContainer: {
    backgroundColor: color.lighter,
    borderWidth: 1,
    borderColor: color.medium,
    width: undefined,
  },
  btnText: {fontSize: 15, color: color.medium},
});
