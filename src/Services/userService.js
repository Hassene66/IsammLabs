import axios from '../Utils/axios';

const getAllUserApi = (params = undefined) =>
  axios.get('/api/users', {
    params: params,
  });

const getUserApi = id => axios.get(`/api/users/${id}`);

const updateUserApi = (id, data) => axios.put(`/api/users/${id}`, data);

const updateFCMTokenApi = async (id, data) =>
  axios.put(`/api/users/fcm/${id}`, null, {headers: {fcm_key: data}});

const addUserApi = data => axios.post('/api/users/', data);

const deleteUserApi = id => axios.delete(`/api/users/${id}`);

export default {
  getAllUserApi,
  getUserApi,
  addUserApi,
  updateUserApi,
  updateFCMTokenApi,
  deleteUserApi,
};
