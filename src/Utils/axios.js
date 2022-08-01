import axios from 'axios';

export default axios.create({
  timeout: 150000,
  baseURL: 'https://isamm-labs-backend.herokuapp.com',
  // baseURL: '192.168.44.191:5000',
});
