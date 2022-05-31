import {useState, useEffect} from 'react';
import AsyncStorage from '../Utils/asyncStorage';
async function getSavedValue(key, initialValue) {
  let savedValue = undefined;
  try {
    const value = await AsyncStorage.getItem(key);
    savedValue = value;
  } catch (error) {
    console.log('Async Storage error');
  }
  if (savedValue) return savedValue;
  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

const setAsyncValue = async (key, value) => {
  try {
    AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('error while updating async storage');
  }
};
const useAsyncStorage = (key = 'token', initialValue = null) => {
  const [value, setValue] = useState(
    async () => await getSavedValue(key, initialValue),
  );

  useEffect(() => {
    setAsyncValue(key, value);
  }, [value]);
  return [value, setValue];
};

export default useAsyncStorage;
