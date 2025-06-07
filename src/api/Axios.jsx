import React from 'react'
import axios from 'axios'


export const AxiosInstance = axios.create({
     baseURL: import.meta.env.VITE_REGISTER_ADMIN,
     headers: {
        'Content-Type': 'application/json',
     }
})

// intercepts if there is a token
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

