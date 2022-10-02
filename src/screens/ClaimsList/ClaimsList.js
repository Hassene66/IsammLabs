import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import uuid from 'react-native-uuid';
import ClaimsCard from './ClaimsCard';
import storage from '../../Utils/asyncStorage';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import {View, Text} from 'react-native';
import {Dialog, Root, ALERT_TYPE} from 'react-native-alert-notification';
import {useIsFocused} from '@react-navigation/native';
import color from '../../Config/color';
import {AppForm, SubmitButton} from '../../Components/forms';
import claimService from '../../Services/claimService';
import {ActivityIndicator} from 'react-native-paper';
import moment from 'moment-timezone';
import claimOptions from '../../Utils/claimOptions';
const ClaimsList = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [claims, setClaims] = useState([]);
  const [reload, setReload] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
  const isFocused = useIsFocused();
  const claimType = route?.params?.fromRoute;
  const fetchData = ({claimsP, offsetP = offset} = {}) => {
    storage
      .getItem('user')
      .then(user => {
        return claimService.getAllClaimsApi({
          assignedTo: user._id,
          status: claimType,
          offset: offsetP + 1,
          ...(claimType ? {size: 5} : {size: 100}),
        });
      })
      .then(({data}) => {
        Dialog.hide();
        if (data.length) {
          let filtredData = data;
          if (claimType) {
            filtredData = data.filter(claim =>
              moment().isBefore(moment(claim.createdAt).add(11, 'd')),
            );
          } else {
            filtredData = data.filter(
              claim =>
                moment().isAfter(moment(claim?.createdAt).add(11, 'd')) &&
                (claim?.status === claimOptions[0].value ||
                  claim?.status === claimOptions[1].value ||
                  ((claim?.status === claimOptions[2].value ||
                    claim?.status === claimOptions[3].value) &&
                    claim?.isApproved === false)),
            );
          }
          setClaims(prev =>
            claimsP ? claimsP.concat(filtredData) : prev.concat(filtredData),
          );
          setOffset(prev => prev + 1);
        } else {
          setLoadMore(false);
        }
      })
      .catch(err => {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erreur',
          textBody: 'échec de la récupération des données du serveur',
          button: 'réessayez',
          closeOnOverlayTap: false,
          onPressButton: () => {
            setReload(prev => prev + 1);
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const reset = () => {
    setOffset(() => 0);
    setClaims(() => []);
    if (isFocused) {
      setLoading(() => true);
      setLoadMore(() => true);
    }
    fetchData({claimsP: [], offsetP: 0});
  };
  useEffect(() => {
    reset();
  }, [isFocused, reload]);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <AppForm
        initialValues={{
          status: 'unprocessed',
        }}
        onSubmit={() => {}}>
        <MyActivityIndicator loading={loading}>
          {!loading &&
            (!!claims.length ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={reset}
                    colors={[color.primary]}
                    tintColor={color.primary}
                  />
                }
                showsVerticalScrollIndicator={false}
                data={claims}
                keyExtractor={() => uuid.v4()}
                onEndReached={fetchData}
                onEndReachedThreshold={1}
                renderItem={({item}) => (
                  <ClaimsCard
                    data={item}
                    pressable={claimType === undefined ? false : true}
                  />
                )}
                ListFooterComponent={() => {
                  return (
                    loadMore && (
                      <View
                        style={{
                          width: '100%',
                          marginTop: 10,
                          marginBottom: 50,
                        }}>
                        <ActivityIndicator size="small" color={color.primary} />
                      </View>
                    )
                  );
                }}
              />
            ) : (
              <View style={styles.messageContainer}>
                <Text style={styles.text}>Aucune réclamation</Text>
                <SubmitButton
                  onSubmit={reset}
                  title="Actualiser"
                  isGradient={false}
                  textStyle={styles.btnText}
                />
              </View>
            ))}
        </MyActivityIndicator>
      </AppForm>
    </View>
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
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: color.dark,
  },
  btnText: {fontSize: 15, color: color.medium},
});
