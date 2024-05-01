'use client';

import axios from 'axios';
import {toast} from 'sonner';
import { getAccessToken } from '@/utils/tokens';

export const Axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  
});

export const AxiosWithNoAuth = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
});

const axiosInstance = axios.create();
Axios.interceptors.request.use(
  config => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  response => response,
  error => {
    if (
      error?.status == 500
    ) {
      toast.error(
        'We are having a problem on our end -- SERVER ERROR PLACEHOLDER',
        { duration: 10000, id: '900' }
      );
      return Promise.reject(error);
    }
    if (
      error?.message === 'Network Error' ||
      error?.code == 'ERR_NETWORK'
        ) {
      toast.error(
        'Check your internet connection -- NETWORK ERROR PLACEHOLDER',
        { duration: 10000, id: '90009' }
      );
      return Promise.reject(error);
    }
    if ((error && error.status === 401) || error?.code == 'token_not_valid') {
      toast.error('Session Expired, Login in again to continue', {
        duration: 10000,
      });
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
