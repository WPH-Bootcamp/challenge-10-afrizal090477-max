import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

import { useAuthStore } from '@/store/auth.store';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://alamat-backend-railway-asli-lu.railway.app',
  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const token = useAuthStore.getState().token;

    if (error.response?.status === 401 && token) {
      useAuthStore.getState().clearAuth();
    }

    return Promise.reject(error);
  },
);