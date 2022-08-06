import axios from '../Utils/axios';

const getAllNotificationsApi = (params = undefined) =>
  axios.get('/api/notification', {
    params: params,
  });

const getNotificationApi = id => axios.get(`/api/notification/${id}`);

const updateNotificationApi = (id, data) =>
  axios.put(`/api/notification/${id}`, data);

const addNotificationApi = data => axios.post('/api/notification', data);

const deleteNotificationApi = id => axios.delete(`/api/notification/${id}`);

export default {
  getAllNotificationsApi,
  getNotificationApi,
  updateNotificationApi,
  addNotificationApi,
  deleteNotificationApi,
};
