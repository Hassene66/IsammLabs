import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
  async getItem(key) {
    return JSON.parse(await AsyncStorage.getItem(key));
  },
  setItem(key, data) {
    AsyncStorage.setItem(key, JSON.stringify(data));
  },
  removeItem(key) {
    AsyncStorage.removeItem(key);
  },
  async clear() {
    await AsyncStorage.clear();
  },
};

export default storage;
