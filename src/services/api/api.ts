import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.10.242:3000'
});

export default api;