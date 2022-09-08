import axios from '../Utils/axios';

const getAllComputersApi = (params = undefined) =>
  axios.get('/api/computer', {
    params: params,
  });

const getComputerApi = id => axios.get(`/api/computer/${id}`);

const updateComputerApi = (id, data) => axios.put(`/api/computer/${id}`, data);

const addComputerApi = data => axios.post('/api/computer', data);

const deleteComputerApi = id => axios.delete(`/api/computer/${id}`);

export default {
  getAllComputersApi,
  getComputerApi,
  updateComputerApi,
  addComputerApi,
  deleteComputerApi,
};
