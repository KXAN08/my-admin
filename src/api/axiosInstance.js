import axios from 'axios';
import { API } from '../hooks/getEnv';

const APIClient = axios.create({
  baseURL: API,
});

APIClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default APIClient;
