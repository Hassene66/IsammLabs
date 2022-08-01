import axios from '../Utils/axios';

const getAllClaimsApi = (params = undefined) =>
  axios.get('/api/claim', {
    params: params,
  });

const getClaimApi = id => axios.get(`/api/claim/${id}`);

const updateClaimApi = (id, data) => axios.put(`/api/claim/${id}`, data);

const addClaimApi = data => axios.post('/api/claim', data);

const deleteClaimApi = id => axios.delete(`/api/claim/${id}`);

export default {
  getAllClaimsApi,
  getClaimApi,
  updateClaimApi,
  addClaimApi,
  deleteClaimApi,
};
