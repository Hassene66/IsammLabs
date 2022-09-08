import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Root} from 'react-native-alert-notification';
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

const menuItem = [
  {
    title: 'Réclamations passées',
    icon: {
      name: 'clipboard-list-outline',
      backgroundColor: color.purple,
    },
    targetScreen: routes.TEACHER_PASSED_CLAIMS,
  },
  {
    title: 'En attente de confirmation',
    icon: {
      name: 'clipboard-check-multiple-outline',
      backgroundColor: color.green,
    },
    targetScreen: routes.TO_CONFIRM_CLAIMS,
  },
  {
    title: 'Réclamations expirées',
    icon: {
      name: 'clipboard-remove-outline',
      backgroundColor: color.green,
    },
    targetScreen: routes.TEACHER_EXPIRED_CLAIMS,
  },
  {
    title: 'Mes Notification',
    icon: {
      name: 'bell-outline',
      backgroundColor: color.pink,
    },
    targetScreen: routes.TEACHER_NOTIFICATION,
  },
];
const TeacherProfile = () => {
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

  return (
    <MyActivityIndicator loading={loading}>
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
              isAvailable={user.isAvailable}
              userID={user._id}
            />
          </View>
          <View style={styles.container}>
            <FlatList
              data={menuItem}
              keyExtractor={menuItem => menuItem.title}
              renderItem={({item}) => (
                <ListItem
                  title={item.title}
                  IconComponent={
                    <MaskedView
                      maskElement={
                        <MaterialCommunityIcons
                          name={item?.icon?.name}
                          size={40}
                          color={color.light_green}
                          style={[
                            styles.icon,
                            {backgroundColor: 'transparent'},
                          ]}
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
              onPress={() => console.log('test')}
            />
          </View>
          <View>
            <ListItem
              title="Déconnexion"
              topBorder
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
              onPress={async () => {
                await storage.removeItem('user');
              }}
            />
          </View>
        </Screen>
      </Root>
    </MyActivityIndicator>
  );
};

export default TeacherProfile;

const styles = StyleSheet.create({
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
