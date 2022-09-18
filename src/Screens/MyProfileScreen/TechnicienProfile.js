import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {ALERT_TYPE, Dialog, Root, Toast} from 'react-native-alert-notification';
import Screen from '../../Components/Screen';
import ListItem from '../../Components/List/ListItem';
import color from '../../Config/color';
import storage from '../../Utils/asyncStorage';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import routes from '../../Navigations/routes';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import authService from '../../Services/authService';

const menuItem = [
  {
    title: 'Réclamations Traitées',
    icon: {
      name: 'clipboard-check-outline',
      backgroundColor: color.green,
    },
    targetScreen: routes.PROCESSED_CLAIMS,
  },
  {
    title: 'En cours de traitement',
    icon: {
      name: 'clipboard-play-outline',
      backgroundColor: color.green,
    },
    targetScreen: routes.IN_PROGRESS_CLAIMS,
  },
  {
    title: 'En attente de confirmation',
    icon: {
      name: 'clipboard-clock-outline',
      backgroundColor: color.purple,
    },
    targetScreen: routes.WAITING_FOR_APPROVAL,
  },
  {
    title: 'Réclamations Expirées',
    icon: {
      name: 'clipboard-remove-outline',
      backgroundColor: color.orange,
    },
    targetScreen: routes.EXPIRED_CLAIMS,
  },
  {
    title: 'Mes Notification',
    icon: {
      name: 'bell-outline',
      backgroundColor: color.pink,
    },
    targetScreen: routes.TECHNICIEN_NOTIFICATION,
  },
];
const TechnicienProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    storage
      .getItem('user')
      .then(user => {
        setUser(user);
      })
      .catch(() =>
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erreur',
          textBody: 'échec de la récupération des données du serveur',
          button: 'réessayez',
          closeOnOverlayTap: false,
          onPressButton: () => {
            setReload(prev => prev + 1);
          },
        }),
      )
      .finally(() => setLoading(false));
  }, [reload]);

  const handleLogout = () => {
    setLoading(true);
    storage
      .getItem('user')
      .then(async user => {
        const fcm = await storage.getItem('fcm_token');
        return [user, fcm];
      })
      .then(([user, fcm]) => authService.logoutApi(user._id, fcm))
      .then(async () => await storage.clear())
      .catch(() => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erreur',
          textBody:
            'Un problème est survenu lors de la tentative de déconnexion. Veuillez réessayer.',
          autoClose: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <MyActivityIndicator loading={loading}>
      <Screen style={styles.screen}>
        <View style={styles.profileInfo}>
          <ListItem
            title={user.fullname || ' '}
            subTitle={user.email || ' '}
            IconComponent={
              <MaskedView
                maskElement={
                  <Ionicons
                    name="md-person-circle-sharp"
                    size={80}
                    color={color.light_green}
                    style={[styles.icon, {backgroundColor: 'transparent'}]}
                  />
                }>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#0e94cf', '#8ac9cb', '#8ac9cb']}>
                  <Ionicons
                    name="md-person-circle-sharp"
                    size={80}
                    color={color.light_green}
                    style={[styles.icon, {opacity: 0}]}
                  />
                </LinearGradient>
              </MaskedView>
            }
            isProfile
            isTech
            isAvailable={user.isAvailable}
            userID={user._id}
          />
        </View>
        <View style={styles.container}>
          <FlatList
            data={menuItem}
            keyExtractor={menuItem => menuItem.title}
            renderItem={({item, idx}) => (
              <ListItem
                title={item.title}
                IconComponent={
                  <MaskedView
                    maskElement={
                      <MaterialCommunityIcons
                        name={item?.icon?.name}
                        size={40}
                        color={color.light_green}
                        style={[styles.icon, {backgroundColor: 'transparent'}]}
                      />
                    }>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#0e94cf', '#8ac9cb', '#8ac9cb']}>
                      <MaterialCommunityIcons
                        name={item?.icon?.name}
                        size={40}
                        color={color.light_green}
                        style={[styles.icon, {opacity: 0}]}
                      />
                    </LinearGradient>
                  </MaskedView>
                }
                onPress={() => navigation.navigate(item.targetScreen)}
              />
            )}
            onPress={() => {}}
            ListFooterComponent={
              <ListItem
                title="Déconnexion"
                IconComponent={
                  <MaskedView
                    maskElement={
                      <MaterialCommunityIcons
                        name="logout"
                        size={40}
                        color={color.light_green}
                        style={[styles.icon, {backgroundColor: 'transparent'}]}
                      />
                    }>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#0e94cf', '#8ac9cb', '#8ac9cb']}>
                      <MaterialCommunityIcons
                        name="logout"
                        size={40}
                        color={color.light_green}
                        style={[styles.icon, {opacity: 0}]}
                      />
                    </LinearGradient>
                  </MaskedView>
                }
                onPress={handleLogout}
              />
            }
          />
        </View>
      </Screen>
    </MyActivityIndicator>
  );
};

export default TechnicienProfile;

const styles = StyleSheet.create({
  container: {
    marginBottom: 120,
  },
  profileInfo: {
    // merginVertical: 10,
  },
  screen: {
    backgroundColor: color.white,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: color.dark_blue,
  },
  email: {
    fontSize: 15,
    color: '#B0B0B0',
    fontWeight: '600',
  },
});
