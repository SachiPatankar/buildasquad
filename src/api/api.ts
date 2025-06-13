import axios from 'axios';
import type { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true, // if your server also sets any cookies, etc.
  headers: {
    'Content-Type': 'application/json',
  },
});