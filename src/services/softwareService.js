import axios from '../Utils/axios';

const getAllSoftwaresApi = (params = undefined) =>
  axios.get('/api/software', {
    params: params,
  });

const getSoftwareApi = id => axios.get(`/api/software/${id}`);

const updateSoftwareApi = (id, data) => axios.put(`/api/software/${id}`, data);

const addSoftwareApi = data => axios.post('/api/software', data);

const deleteSoftwareApi = id => axios.delete(`/api/software/${id}`);

export default {
  getAllSoftwaresApi,
  getSoftwareApi,
  updateSoftwareApi,
  addSoftwareApi,
  deleteSoftwareApi,
};
