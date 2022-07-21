import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Screen from '../../Components/Screen';
import ListItem from '../../Components/List/ListItem';
import color from '../../Config/color';
import Icon from '../../Components/Icon';
import ListItemSeperator from '../../Components/List/ListItemSeperator';
import storage from '../../Utils/asyncStorage';
import MyActivityIndicator from '../../Components/MyActivityIndicator';

const menuItem = [
  {
    title: 'Réclamation En Attente',
    icon: {
      name: 'clock',
      backgroundColor: color.primary,
    },
    targetScreen: 'EnAttente',
  },
  {
    title: 'Réclamation Approuvé',
    icon: {
      name: 'check',
      backgroundColor: color.secondary,
    },
    targetScreen: 'approved',
  },
  {
    title: 'Mes Notification',
    icon: {
      name: 'bell',
      backgroundColor: color.primary,
    },
    targetScreen: 'notification',
  },
];
const MyProfileScreen = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log('in');
    storage
      .getItem('user')
      .then(user => setUser(user))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <MyActivityIndicator loading={loading}>
      <Screen style={styles.screen}>
        <View style={styles.container}>
          <ListItem
            title={user.fullname || ' '}
            subTitle={user.email || ' '}
            image={require('../../assets/userImage.png')}
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
                onPress={() => console.log('test')}
              />
            )}
            onPress={() => console.log('test')}
          />
        </View>
        <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={async () => {
            await storage.clear();
          }}
        />
      </Screen>
    </MyActivityIndicator>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  screen: {
    backgroundColor: color.veryLight,
  },
});
