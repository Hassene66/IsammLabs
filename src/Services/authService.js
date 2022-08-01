import axios from '../Utils/axios';

const loginApi = values => axios.post('/api/login', values);

export default {
  loginApi,
};
