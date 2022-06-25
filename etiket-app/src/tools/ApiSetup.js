/* eslint-disable no-console */
import Cookies from 'js-cookie';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { backendURL } from '../config/constants';

const request = axios.create();

request.interceptors.request.use(async (config) => {
  const currentDate = new Date();
  try {
    const encodedToken = Cookies.get('accessToken');
    if (!encodedToken || '') {
      return config;
    }
    const accessToken = jwtDecode(Cookies.get('accessToken'));
    const newConfig = { ...config };
    if (accessToken.exp * 1000 < currentDate.getTime()) {
      const axiosRefresh = axios.create();
      try {
        const res = await axiosRefresh.post(`${backendURL}UsersDB/refresh`, {
          refreshToken: Cookies.get('refreshToken')
        });
        Cookies.set('accessToken', res.data.accessToken);
        Cookies.set('refreshToken', res.data.refreshToken);
        newConfig.headers.Authorization = `Bearer ${res.data.accessToken}`;
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    }

    return newConfig;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
});

export default request;
