import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import routes from '../../Navigations/routes';
import blocService from '../../Services/blocService';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Logo1 from '../../assets/joystick.svg';
import Logo2 from '../../assets/camera.svg';
import Logo3 from '../../assets/window.svg';
import Logo4 from '../../assets/pain.svg';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {Root, Dialog, ALERT_TYPE} from 'react-native-alert-notification';
import color from '../../Config/color';
export default Home = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);
  const [data, setData] = useState([]);
  const clickEventListener = item => {
    navigation.navigate(routes.LABS_INFO, item);
  };

  useEffect(() => {
    setLoading(true);
    blocService
      .getAllBlocsApi()
      .then(({data}) => setData(data))
      .catch(() => {
        return Dialog.show({
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
      .finally(() => setLoading(false));
  }, [reload, isFocused]);
  const CustomTag = idx => {
    switch (idx) {
      case 0:
        return <Logo1 />;
      case 1:
        return <Logo2 />;
      case 2:
        return <Logo3 />;
      case 3:
        return <Logo4 />;
      default:
        break;
    }
  };
  return (
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
        <View style={styles.container}>
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={data}
            horizontal={false}
            numColumns={2}
            keyExtractor={({_id}) => _id}
            renderItem={({item, index}) => {
              return (
                <View>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => {
                      clickEventListener(item);
                    }}>
                    <View
                      style={{
                        marginVertical: 7,
                        marginTop: 28,
                      }}>
                      {CustomTag(index)}
                    </View>
                    <MaskedView
                      maskElement={
                        <Text
                          style={[
                            styles.title,
                            {backgroundColor: 'transparent'},
                          ]}>
                          {item.label}
                        </Text>
                      }>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={[
                          '#0e94cf',
                          '#289fce',
                          '#5db5cc',
                          '#72bfcc',
                          '#8ac9cb',
                        ]}>
                        <Text style={[styles.title, {opacity: 0}]}>
                          {item.label}
                        </Text>
                      </LinearGradient>
                    </MaskedView>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </MyActivityIndicator>
    </Root>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  list: {
    paddingHorizontal: 5,
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.27,
    shadowRadius: 11.49,
    elevation: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    flexBasis: '42%',
    width: 160,
    height: 160,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderRadius: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 50,
    width: 50,
  },
  title: {
    flex: 1,
    fontSize: 22,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#696969',
    fontWeight: '900',
  },
});
