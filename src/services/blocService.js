import axios from '../Utils/axios';

const getAllBlocsApi = (params = undefined) =>
  axios.get('/api/bloc', {
    params: params,
  });

const getBlocApi = id => axios.get(`/api/bloc/${id}`);

const updateBlocApi = (id, data) => axios.put(`/api/bloc/${id}`, data);

const addBlocApi = data => axios.post('/api/bloc', data);

const deleteBlocApi = id => axios.delete(`/api/bloc/${id}`);

export default {
  getAllBlocsApi,
  addBlocApi,
  getBlocApi,
  updateBlocApi,
  deleteBlocApi,
};
