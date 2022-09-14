import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import uuid from 'react-native-uuid';
import storage from '../../../Utils/asyncStorage';
import MyActivityIndicator from '../../../Components/MyActivityIndicator';
import {View, Text} from 'react-native';
import {ALERT_TYPE, Dialog, Root} from 'react-native-alert-notification';
import {useIsFocused} from '@react-navigation/native';
import color from '../../../Config/color';
import {AppForm, SubmitButton} from '../../../Components/forms';
import claimService from '../../../Services/claimService';
import ClaimsCardWithDetails from '../../../Components/ClaimCardWithDetails';
import SwitchSelector from 'react-native-switch-selector';
import {ActivityIndicator} from 'react-native-paper';
import routes from '../../../Navigations/routes';

const RESOLU = 'resolved';
const NON_RESOLU = 'not_resolved';
const options = [
  {label: 'Résolu', value: RESOLU},
  {label: 'Non résolu', value: NON_RESOLU},
];
const ProcessedClaims = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [claims, setClaims] = useState([]);
  const [reload, setReload] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
  const [switchValue, setSwitchValue] = useState(options[0].value);
  const isFocused = useIsFocused();

  const fetchData = ({
    claimsP,
    offsetP = offset,
    selectedSwitchP = switchValue,
  } = {}) => {
    storage
      .getItem('user')
      .then(user => {
        setSwitchValue(selectedSwitchP);
        return claimService.getAllClaimsApi({
          assignedTo: user._id,
          status: selectedSwitchP,
          offset: offsetP + 1,
          size: 5,
          isApproved: route.name === routes.PROCESSED_CLAIMS ? true : undefined,
          isConfirmed:
            route.name === routes.WAITING_FOR_APPROVAL ? false : true,
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

  const reset = value => {
    setOffset(() => 0);
    setClaims(() => []);
    if (isFocused) {
      setLoading(() => true);
      setLoadMore(() => true);
      setSwitchValue(options[0].value);
    }
    fetchData({claimsP: [], offsetP: 0, selectedSwitchP: value});
  };
  useEffect(() => {
    reset();
  }, [isFocused, reload]);

  return (
    <AppForm
      initialValues={{
        status: 'unprocessed',
      }}
      onSubmit={() => {}}>
      <View style={styles.TopContainer}>
        <View style={{margin: 10}}>
          <SwitchSelector
            borderRadius={5}
            buttonColor={color.primary}
            options={options}
            initial={0}
            onPress={value => reset(value)}
            backgroundColor={color.lighter}
          />
        </View>
        <View style={styles.BodyContainer}>
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
                      <ClaimsCardWithDetails data={item} />
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
          </Root>
        </View>
      </View>
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
  TopContainer: {flex: 1},
  BodyContainer: {
    overflow: 'hidden',
    flex: 1,
    marginTop: 10,
  },
});
