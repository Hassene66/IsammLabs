import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import routes from '../../Navigations/routes';
import Logo from '../../assets/door.svg';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';

export default Home = ({route}) => {
  const navigation = useNavigation();
  const labsData = route?.params;
  const [data] = useState(labsData);
  const clickEventListener = (item, label) => {
    navigation.navigate(routes.PC_LISTING, {...item, label});
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={data.labs}
        horizontal={false}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  clickEventListener(item, data?.label);
                }}>
                <View style={{marginVertical: 12}}>
                  <Logo />
                </View>
                <MaskedView
                  maskElement={
                    <Text
                      style={[styles.title, {backgroundColor: 'transparent'}]}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#fefefe',
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#fefefe',
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
    marginVertical: 5,
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
