import axios from '../Utils/axios';

const loginApi = values => axios.post('/api/login', values);

const logoutApi = async (id, data) =>
  axios.put(`/api/logout/${id}`, null, {headers: {fcm_key: data}});
export default {
  loginApi,
  logoutApi,
};
