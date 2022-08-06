import axios from 'axios';

export default axios.create({
  timeout: 150000,
  // baseURL: 'https://isamm-labs-backend.herokuapp.com',
  baseURL: 'http://localhost:5000',
});
