import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Screen from '../../Components/Screen';
import ListItem from '../../Components/List/ListItem';
import color from '../../Config/color';
import Icon from '../../Components/Icon';
import ListItemSeperator from '../../Components/List/ListItemSeperator';

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
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Fortune Ikechi"
          subTitle="ikechifortune@gmail.com"
          image={require('../../assets/profile.png')}
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
      />
    </Screen>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: color.veryLight,
  },
});
