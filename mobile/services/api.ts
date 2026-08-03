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

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (error.response?.data?.code === 'TOKEN_EXPIRED') {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return api(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { useAuthStore } = require('../store/useAuthStore');
          const SecureStore = require('expo-secure-store');
          const currentRefreshToken = useAuthStore.getState().refreshToken;

          if (!currentRefreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken: currentRefreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          await SecureStore.setItemAsync('user_token', accessToken);
          await SecureStore.setItemAsync('user_refresh_token', newRefreshToken);

          useAuthStore.setState({ token: accessToken, refreshToken: newRefreshToken });

          processQueue(null, accessToken);
          
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          
          try {
            const { useAuthStore } = require('../store/useAuthStore');
            const SecureStore = require('expo-secure-store');
            await SecureStore.deleteItemAsync('user_token');
            await SecureStore.deleteItemAsync('user_refresh_token');
            useAuthStore.setState({ user: null, token: null, refreshToken: null, isAuthenticated: false });
          } catch (e) {
            console.error('Failed to logout after refresh failure', e);
          }
          
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
