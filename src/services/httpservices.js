import axios from 'axios';
import * as Keychain from 'react-native-keychain'; // or expo-secure-store

const httpServices = axios.create({
  baseURL: 'https://aapsuj.accevate.co/flutter-api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

httpServices.interceptors.request.use(
  async (config) => {
    const credentials = await Keychain.getGenericPassword();
    const token = credentials ? credentials.password : '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpServices;
