import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import uuid from 'react-native-uuid';
import InProgressClaimCard from './InProgressClaimCard';
import storage from '../../../Utils/asyncStorage';
import MyActivityIndicator from '../../../Components/MyActivityIndicator';
import {View, Text} from 'react-native';
import {Dialog, Root, ALERT_TYPE} from 'react-native-alert-notification';
import {useIsFocused} from '@react-navigation/native';
import color from '../../../Config/color';
import {AppForm, SubmitButton} from '../../../Components/forms';
import claimService from '../../../Services/claimService';
import claimStatus from '../../../Utils/claimStatus';
import {ActivityIndicator} from 'react-native-paper';
const InProgressList = () => {
  const [loading, setLoading] = useState(true);
  const [claims, setClaims] = useState([]);
  const [reload, setReload] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
  const isFocused = useIsFocused();
  const fetchData = ({claimsP, offsetP = offset} = {}) => {
    storage
      .getItem('user')
      .then(user => {
        return claimService.getAllClaimsApi({
          assignedTo: user._id,
          status: claimStatus.IN_PROGRESS,
          offset: offsetP + 1,
          size: 5,
        });
      })
      .then(({data}) => {
        Dialog.hide();
        if (data.length) {
          setClaims(prev =>
            claimsP ? claimsP.concat(data) : prev.concat(data),
          );
          setOffset(prev => prev + 1);
        } else {
          setLoadMore(false);
        }
      })
      .catch(() => {
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
                  renderItem={({item}) => <InProgressClaimCard data={item} />}
                  ListFooterComponent={() => {
                    return (
                      loadMore && (
                        <View
                          style={{
                            width: '100%',
                            marginTop: 10,
                            marginBottom: 50,
                          }}>
                          <ActivityIndicator
                            size="small"
                            color={color.primary}
                          />
                        </View>
                      )
                    );
                  }}
                />
              ) : (
                <View style={styles.messageContainer}>
                  <Text style={styles.text}>Aucune réclamation à traiter</Text>
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
      </Root>
    </View>
  );
};
export default InProgressList;

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
