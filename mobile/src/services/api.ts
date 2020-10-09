import axios from 'axios';

const api = axios.create({
  // 'http://<ip_da_maquina>:3333
  baseURL: 'http://192.168.100.160:3333',
});

export default api;
