import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Switch,
} from 'react-native';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../Config/color';
import userService from '../../Services/userService';
import storage from '../../Utils/asyncStorage';
import AppText from '../Text';

const ListItem = ({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  isProfile = false,
  isTech = false,
  userID,
  isAvailable,
  topBorder = false,
}) => {
  const [isEnabled, setIsEnabled] = useState(isAvailable);

  const ChangeVisibility = () => {
    userService
      .updateUserApi(userID, {isAvailable: !isEnabled})
      .then(({data}) => {
        return storage.setItem('user', data.user);
      })
      .catch(() => {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erreur',
          textBody: 'échec de la récupération des données du serveur',
          button: 'fermer',
          closeOnOverlayTap: false,
          onPressButton: () => {
            setIsEnabled(prev => !prev);
            Dialog.hide();
          },
        });
      });
  };

  const handleChange = () => {
    if (userID) {
      setIsEnabled(!isEnabled);
      ChangeVisibility();
    }
  };
  useEffect(() => {
    setIsEnabled(isAvailable);
  }, [isAvailable]);

  return (
    <TouchableHighlight onPress={onPress} underlayColor={color.primary}>
      <View
        style={[
          styles.container,
          !isProfile && styles.bottomBorder,
          topBorder && styles.topBorder,
        ]}>
        {IconComponent}
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.detailContainer}>
          <AppText numberOfLines={1} style={styles.title}>
            {title}
          </AppText>
          {subTitle && (
            <AppText numberOfLines={2} style={styles.subTitle}>
              {subTitle}
            </AppText>
          )}
        </View>
        {isProfile ? (
          isTech && (
            <Switch
              trackColor={{true: color.secondary, false: '#767577'}}
              thumbColor={isEnabled ? color.primary : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleChange}
              value={isEnabled}
            />
          )
        ) : (
          <MaterialCommunityIcons
            color={color.medium}
            name="chevron-right"
            size={25}
          />
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: color.white,
    alignItems: 'center',
  },
  detailContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  title: {
    fontWeight: '600',
  },
  subTitle: {
    color: color.medium,
    fontSize: 14,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: color.primary,
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: color.primary,
  },
});
export default ListItem;
