import axios from 'axios';

function getAllBlocs() {
  return axios.get('/api/bloc');
}
export default {
  getAllBlocs,
};
