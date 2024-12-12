'use client';

import axios from 'axios';
import { SignIn, Tokens } from './type';
import { getCookie, setCookie } from 'cookies-next/client';
import { string } from 'zod';

const instance = axios.create({
  baseURL: 'https://api-diplom.build-brain.uz',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
});

instance.interceptors.request.use(function (config) {
  const accessToken = getCookie('access');

  console.info('accessToken: ', accessToken);

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

export const signin = async (data: SignIn) => {
  try {
    const response = await instance.post<Tokens>('/login/', data);
    setCookie('access', response.data.access);
    // setCookie('access', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyNjk3MDQxLCJpYXQiOjE3MzI2MTA2NDEsImp0aSI6ImMwMjkyNzcxOGVlMjQ1OGM5MzZhMTVlMWYwODc1ZmQ1IiwidXNlcl9pZCI6MX0.36dBsh1dDfouzV3pkHCOspGC0fEir_RijmIB9JnqTkA");
    setCookie('refresh', response.data.refresh);
  } catch (error) {
    console.error(error);
  }
};

export const repository = () => {
  return {
    async getJournal(subject = 1) {
      try {
        const response = await instance.get(`/estimation/journal/?subject=${subject}&group=`);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getSubjects() {
      try {
        const response = await instance.get('/subject/');
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async getSchedule() {
      try {
        const response = await instance.get('/schedule/');
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getStudents() {
      try {
        const response = await instance.get('/student/');
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getQuestions() {
      try {
        const response = await instance.get('/question/');
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async getUser() {
      try {
        const response = await instance.get('/user/me');
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async submitResults(data: { y1: number; y2: number; studentId: string | null }) {
      try {
        const response = await instance.post('/reference/', data);
        return response.data;
      } catch (error) {
        console.error('Ошибка при отправке результатов:', error);
        throw error; // Генерация ошибки для обработки в компоненте
      }
    },

    async getLastCertificate() {
      try {
        const response = await instance.get(`/reference/active/`);
        return response.data;
      } catch (error) {
        console.error('Ошибка при получении данных студента:', error);
        throw error;
      }
    },

    async getStudentData(studentId: string | null) {
      try {
        if (!studentId) {
          throw new Error('Student ID is required');
        }

        const response = await instance.get(`/student/${studentId}/gpa/`);
        return response.data;
      } catch (error) {
        console.error('Ошибка при получении данных студента:', error);
        throw error; // Генерация ошибки для обработки в компоненте
      }
    },
  };
};
