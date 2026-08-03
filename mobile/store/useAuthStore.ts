import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

export interface User {
  id: number;
  fullName: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  restoreSession: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,

  restoreSession: async () => {
    try {
      const token = await SecureStore.getItemAsync('user_token');
      const refreshToken = await SecureStore.getItemAsync('user_refresh_token');
      
      if (!token || !refreshToken) {
        set({ user: null, token: null, refreshToken: null, isAuthenticated: false, isLoading: false });
        return;
      }

      set({ token, refreshToken });

      const response = await api.get('/auth/me');
      const user = response.data;
      
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      await SecureStore.deleteItemAsync('user_token');
      await SecureStore.deleteItemAsync('user_refresh_token');
      set({ user: null, token: null, refreshToken: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { accessToken, refreshToken, user } = response.data;

    await SecureStore.setItemAsync('user_token', accessToken);
    await SecureStore.setItemAsync('user_refresh_token', refreshToken);
    set({ user, token: accessToken, refreshToken, isAuthenticated: true });
  },

  register: async (fullName, email, password) => {
    const response = await api.post('/auth/register', { fullName, email, password });
    const { accessToken, refreshToken, user } = response.data;

    await SecureStore.setItemAsync('user_token', accessToken);
    await SecureStore.setItemAsync('user_refresh_token', refreshToken);
    set({ user, token: accessToken, refreshToken, isAuthenticated: true });
  },

  logout: async () => {
    try {
      const currentRefreshToken = useAuthStore.getState().refreshToken;
      if (currentRefreshToken) {
        await api.post('/auth/logout', { refreshToken: currentRefreshToken });
      }
    } catch (error) {
      console.warn('Backend logout failed:', error);
    }
    await SecureStore.deleteItemAsync('user_token');
    await SecureStore.deleteItemAsync('user_refresh_token');
    set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
  },
}));
