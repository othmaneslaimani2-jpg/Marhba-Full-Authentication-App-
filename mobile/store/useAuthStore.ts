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
  isAuthenticated: false,
  isLoading: true,

  restoreSession: async () => {
    try {
      const token = await SecureStore.getItemAsync('user_token');
      if (!token) {
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        return;
      }

      set({ token });

      const response = await api.get('/auth/me');
      const user = response.data;
      
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      await SecureStore.deleteItemAsync('user_token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;

    await SecureStore.setItemAsync('user_token', token);
    set({ user, token, isAuthenticated: true });
  },

  register: async (fullName, email, password) => {
    const response = await api.post('/auth/register', { fullName, email, password });
    const { token, user } = response.data;

    await SecureStore.setItemAsync('user_token', token);
    set({ user, token, isAuthenticated: true });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('user_token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
