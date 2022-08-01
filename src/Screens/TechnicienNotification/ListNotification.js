import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, RefreshControl, Text, View} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import color from '../../Config/color';
import Notification from '../../Components/Notification';
import uuid from 'react-native-uuid';
import ClaimsCard from '../ClaimsList/ClaimsCard';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import {Root} from 'react-native-alert-notification';
import {useIsFocused} from '@react-navigation/native';
import {AppForm, SubmitButton} from '../../Components/forms';
import ListItemSeperator from '../../Components/List/ListItemSeperator';
import notificationService from '../../Services/notificationService';
import storage from '../../Utils/asyncStorage';

const ListNotification = () => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState([]);
  const isFocused = useIsFocused();
  const options = [
    {label: "Aujourd'hui", value: '1'},
    {label: 'Tous', value: '1.5'},
  ];

  const fetchData = () => {
    setLoading(true);
    storage
      .getItem('user')
      .then(user => {
        return notificationService.getAllNotificationsApi({
          assignedTo: user._id,
        });
      })
      .then(({data}) => {
        setNotification(data);
      })
      .catch(err => console.log(JSON.stringify(err.response)))
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
      <View style={styles.TopContainer}>
        <SwitchSelector
          buttonColor={color.primary}
          options={options}
          initial={0}
          onPress={value => console.log(`Call onPress with value: ${value}`)}
        />
        <View style={styles.BodyContainer}>
          <MyActivityIndicator loading={loading}>
            <View style={styles.toast}>
              <Root theme="light" />
            </View>
            {!loading &&
              (!!notification.length ? (
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
                  ItemSeparatorComponent={ListItemSeperator}
                  data={notification}
                  keyExtractor={() => uuid.v4()}
                  renderItem={({item}) => <Notification data={item} />}
                />
              ) : (
                <View style={styles.messageContainer}>
                  <Text style={styles.text}>aucune notification trouvée</Text>
                  <SubmitButton
                    onSubmit={fetchData}
                    title="Actualiser"
                    style={styles.btnContainer}
                    textStyle={styles.btnText}
                  />
                </View>
              ))}
          </MyActivityIndicator>
        </View>
      </View>
    </AppForm>
  );
};

export default ListNotification;

const styles = StyleSheet.create({
  TopContainer: {margin: 10, flex: 1},
  BodyContainer: {
    overflow: 'hidden',
    backgroundColor: color.lighter,
    flex: 1,
    borderRadius: 10,
    marginTop: 10,
  },
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
