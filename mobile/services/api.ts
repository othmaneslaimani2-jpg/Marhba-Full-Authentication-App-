import axios, { InternalAxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';

const getBackendUrl = () => {
  const hostUri = Constants.expoConfig?.hostUri || Constants.manifest2?.extra?.expoGo?.debuggerHost;
  if (hostUri) {
    const host = hostUri.split(':')[0];
    return `http://${host}:5000/api`;
  }
  return 'http://localhost:5000/api';
};

const API_URL = getBackendUrl();
console.log('Connecting to backend API at:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      const { useAuthStore } = require('../store/useAuthStore');
      const token = useAuthStore.getState().token;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching token from Zustand store:', error);
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

export default api;
