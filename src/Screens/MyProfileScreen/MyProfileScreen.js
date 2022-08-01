import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Root} from 'react-native-alert-notification';
import Screen from '../../Components/Screen';
import ListItem from '../../Components/List/ListItem';
import color from '../../Config/color';
import Icon from '../../Components/Icon';
import ListItemSeperator from '../../Components/List/ListItemSeperator';
import storage from '../../Utils/asyncStorage';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import routes from '../../Navigations/routes';
import {useNavigation} from '@react-navigation/native';

const menuItem = [
  {
    title: 'Réclamation Traitées',
    icon: {
      name: 'check',
      backgroundColor: color.secondary,
    },
    targetScreen: routes.PROCESSED_CLAIMS,
  },
  {
    title: 'Réclamation En Attente',
    icon: {
      name: 'clock',
      backgroundColor: color.purple,
    },
    targetScreen: 'EnAttente',
  },
  {
    title: 'Réclamations Expirées',
    icon: {
      name: 'alert',
      backgroundColor: color.orange,
    },
    targetScreen: 'notification',
  },
  {
    title: 'Mes Notification',
    icon: {
      name: 'bell',
      backgroundColor: color.pink,
    },
    targetScreen: routes.TECHNICIEN_NOTIFICATION,
  },
];
const MyProfileScreen = () => {
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
      <Root theme="light">
        <Screen style={styles.screen}>
          <View style={styles.profileInfo}>
            <ListItem
              title={user.fullname || ' '}
              subTitle={user.email || ' '}
              image={require('../../assets/userImage.png')}
              isProfile
              isAvailable={user.isAvailable}
              userID={user._id}
            />
          </View>
          <View style={styles.container}>
            <FlatList
              data={menuItem}
              keyExtractor={menuItem => menuItem.title}
              ItemSeparatorComponent={ListItemSeperator}
              renderItem={({item}) => (
                <ListItem
                  title={item.title}
                  IconComponent={
                    <Icon
                      name={item.icon.name}
                      backgroundColor={item.icon.backgroundColor}
                    />
                  }
                  onPress={() => navigation.navigate(item.targetScreen)}
                />
              )}
              onPress={() => console.log('test')}
            />
          </View>
          <View style={styles.logoutFooter}>
            <ListItem
              title="Log Out"
              IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
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

export default MyProfileScreen;

const styles = StyleSheet.create({
  profileInfo: {
    marginBottom: 15,
  },
  logoutFooter: {
    marginVertical: 15,
  },
  screen: {
    backgroundColor: color.veryLight,
  },
});
