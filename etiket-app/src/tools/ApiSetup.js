import Cookies from 'js-cookie';
import { backendURL } from '../config/constants.js';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const request = axios.create();

request.interceptors.request.use(async (config) => {
  let currentDate = new Date();
  try {
    const encodedToken = Cookies.get('accessToken');
    if (!encodedToken || '') {
      return config;
    } else {
      const accessToken = jwt_decode(Cookies.get('accessToken'));
      if (accessToken.exp * 1000 < currentDate.getTime()) {
        const axiosRefresh = axios.create();
        try {
          const res = await axiosRefresh.post(backendURL + 'UsersDB/refresh', {
            refreshToken: Cookies.get('refreshToken')
          });
          Cookies.set('accessToken', res.data.accessToken);
          Cookies.set('refreshToken', res.data.refreshToken);
          config.headers['Authorization'] = 'Bearer ' + res.data.accessToken;
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      }

      return config;
    }
  } catch (error) {
    console.log(error);
  }
});

export default request;
