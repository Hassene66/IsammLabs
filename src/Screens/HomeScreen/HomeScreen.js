import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import routes from '../../Navigations/routes';
import blocService from '../../Services/BlocsService';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import mockData from '../../Utils/blocsData';
import Logo1 from '../../assets/joystick.svg';
import Logo2 from '../../assets/camera.svg';
import Logo3 from '../../assets/window.svg';
import Logo4 from '../../assets/pain.svg';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';

export default Home = () => {
  const navigation = useNavigation();
  const [laoding, setLaoding] = useState(false);
  // const fetchAllBlocks = async () => {
  //   try {
  //     setLaoding(true);
  //     const blocs = await blocService.getAllBlocs();
  //     setData(blocs);
  //     setLaoding(false);
  //   } catch (error) {
  //     showMessage({
  //       message: 'Erreur de serveur',
  //       type: 'danger',
  //       icon: 'auto',
  //       duration: 2500,
  //     });
  //   } finally {
  //     setLaoding(false);
  //   }
  // };
  useEffect(() => {
    setLaoding(true);
    blocService
      .getAllBlocs()
      .then(data => {
        setData(data);
      })
      .catch(() =>
        showMessage({
          message: 'Erreur de serveur',
          type: 'danger',
          icon: 'auto',
          duration: 2500,
        }),
      )
      .finally(setLaoding(false));
  }, []);
  const [data, setData] = useState(mockData);

  const clickEventListener = item => {
    navigation.navigate(routes.LABS_INFO, item);
  };

  return (
    <MyActivityIndicator loading={laoding}>
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={data}
          horizontal={false}
          numColumns={2}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({item, index}) => {
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
