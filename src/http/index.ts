import axios from 'axios';
import {BASE_URL} from '../environment/constants';

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

api.interceptors.request.use(config => {
  // TODO use token after authorization
  config.headers.Authorization = `Bearer dZhzHlw8Flpsf8W9Duq4rsJ1UVT4dRlW`;
  return config;
});

export default api;
