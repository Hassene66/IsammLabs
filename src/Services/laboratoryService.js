import axios from '../Utils/axios';

const getAllLaboratorysApi = (params = undefined) =>
  axios.get('/api/laboratory', {
    params: params,
  });

const getLaboratoryApi = id => axios.get(`/api/laboratory/${id}`);

const updateLaboratoryApi = (id, data) =>
  axios.put(`/api/laboratory/${id}`, data);

const addLaboratoryApi = data => axios.post('/api/laboratory', data);

const deleteLaboratoryApi = id => axios.delete(`/api/laboratory/${id}`);

export default {
  getAllLaboratorysApi,
  addLaboratoryApi,
  getLaboratoryApi,
  updateLaboratoryApi,
  deleteLaboratoryApi,
};
