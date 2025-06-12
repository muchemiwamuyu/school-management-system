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

export const AxiosInstance2 = axios.create({
  baseURL: import.meta.env.VITE_CLASS_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const AxiosInstance3 = axios.create({
  baseURL: import.meta.env.VITE_BIOMETRICS_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})


export const AxiosInstance4 = axios.create({
  baseURL: import.meta.env.VITE_STUDENT_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})