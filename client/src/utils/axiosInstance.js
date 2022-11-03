import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://joyous-cod-wig.cyclic.app/api/v1/',
});
