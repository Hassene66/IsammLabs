import jwtDecode from 'jwt-decode';

async function getCurrentUser(key) {
  try {
    let savedValue = null;
    savedValue = await AsyncStorage.getItem(key);
    let decodedToken = jwtDecode(savedValue);
    return decodedToken;
  } catch (error) {
    console.log('Async Storage error');
    return null;
  }
}
export default getCurrentUser;
