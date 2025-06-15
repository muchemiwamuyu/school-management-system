import React from 'react'
import axios from 'axios'


export const AxiosInstance1 = axios.create({
  baseURL: import.meta.env.VITE_REGISTER_ADMIN,
  headers: {
    "Content-Type": "application/json",
  },
});



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