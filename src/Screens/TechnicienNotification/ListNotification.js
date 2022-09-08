import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, RefreshControl, Text, View} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import color from '../../Config/color';
import Notification from '../../Components/Notification';
import uuid from 'react-native-uuid';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import {Dialog, Root} from 'react-native-alert-notification';
import {useIsFocused} from '@react-navigation/native';
import {AppForm, SubmitButton} from '../../Components/forms';
import ListItemSeperator from '../../Components/List/ListItemSeperator';
import notificationService from '../../Services/notificationService';
import storage from '../../Utils/asyncStorage';

const ListNotification = () => {
  const [loading, setLoading] = useState(false);
  const [todayNotifications, setTodayNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [reload, setReload] = useState(0);
  const [selectedSwitch, setSelectedSwitch] = useState('today');
  const isFocused = useIsFocused();
  const TODAY = 'today';
  const ALL = 'all';
  const options = [
    {label: "Aujourd'hui", value: TODAY},
    {label: 'Tous', value: ALL},
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
        setAllNotifications(data);
        setTodayNotifications(
          data.filter(notification =>
            moment(notification?.createdAt).isSame(
              momentTimezone().tz('Africa/Tunis').add(1, 'hours'),
              'days',
            ),
          ),
        );
      })
      .catch(() =>
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erreur',
          textBody: 'échec de la récupération des données du serveur',
          button: 'fermer',
          closeOnOverlayTap: false,
        }),
      )
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [isFocused, reload]);

  const handleDelete = id => {
    notificationService
      .deleteNotificationApi(id)
      .then(() => setReload(prev => prev + 1))
      .catch(() => {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erreur',
          textBody: 'échec de la récupération des données du serveur',
          button: 'fermer',
          closeOnOverlayTap: false,
        });
      });
  };

  return (
    <AppForm
      initialValues={{
        status: 'unprocessed',
      }}
      onSubmit={() => {}}>
      <View style={styles.TopContainer}>
        <SwitchSelector
          borderRadius={5}
          buttonColor={color.primary}
          options={options}
          initial={0}
          onPress={value => setSelectedSwitch(value)}
          backgroundColor={color.lighter}
        />
        <View style={styles.BodyContainer}>
          <MyActivityIndicator loading={loading}>
            <View style={styles.toast}>
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
                ]}
              />
            </View>
            {!loading &&
              ((!!todayNotifications.length && selectedSwitch === TODAY) ||
              (!!allNotifications.length && selectedSwitch === ALL) ? (
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
                  data={
                    selectedSwitch === TODAY
                      ? todayNotifications
                      : allNotifications
                  }
                  keyExtractor={() => uuid.v4()}
                  renderItem={({item}) => (
                    <Notification data={item} handleDelete={handleDelete} />
                  )}
                />
              ) : (
                <View style={styles.messageContainer}>
                  <Text style={styles.text}>Aucune notification trouvée</Text>
                  <SubmitButton
                    onSubmit={fetchData}
                    title="Actualiser"
                    isGradient={false}
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
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: color.dark,
  },
  btnText: {fontSize: 15, color: color.medium},
});
