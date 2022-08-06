import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import uuid from 'react-native-uuid';
import ClaimsCard from '../ClaimsList/ClaimsCard';
import storage from '../../Utils/asyncStorage';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import {View, Text} from 'react-native';
import {Root} from 'react-native-alert-notification';
import {useIsFocused} from '@react-navigation/native';
import color from '../../Config/color';
import {AppForm, SubmitButton} from '../../Components/forms';
import claimService from '../../Services/claimService';

const ProcessedClaims = () => {
  const [loading, setLoading] = useState(true);
  const [claims, setClaims] = useState([]);

  const isFocused = useIsFocused();

  const fetchData = () => {
    setLoading(true);
    storage
      .getItem('user')
      .then(user => {
        return claimService.getAllClaimsApi({
          assignedTo: user._id,
          status: 'resolved',
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
              renderItem={({item}) => (
                <ClaimsCard pressable={false} data={item} />
              )}
            />
          ) : (
            <View style={styles.messageContainer}>
              <Text style={styles.text}>Aucune réclamation traitée</Text>
              <SubmitButton
                onSubmit={fetchData}
                isGradient={false}
                title="Actualiser"
                textStyle={styles.btnText}
              />
            </View>
          ))}
      </MyActivityIndicator>
    </AppForm>
  );
};

export default ProcessedClaims;

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: color.dark,
  },
  btnText: {fontSize: 15, color: color.medium},
});