// // src/api/axios.ts
// import axios from 'axios';
// import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
// import useAuthStore from '@/stores/userAuthStore';
// import { toast } from 'react-toastify';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true, // Important for cookies to be sent with requests
// });

// // List of endpoints that don't require authentication
// const publicEndpoints = [
//   '/v1/auth/login',
//   '/v1/auth/signup',
//   '/v1/auth/forgot-password',
//   '/v1/auth/reset-password/:id/:token',
//   '/v1/auth/google',
//   '/v1/auth/github',
//   '/v1/auth/google/callback',
//   '/v1/auth/github/callback',
// ];

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = useAuthStore.getState().token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle errors
// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
//     const status = error.response?.status;
//     const url = originalRequest?.url || '';

//     // Check if the request is to a public endpoint
//     const isPublic = publicEndpoints.some(endpoint => url.endsWith(endpoint));

//     // Handle 401 Unauthorized
//     if (status === 401 && !isPublic && !originalRequest?._retry) {
//       // If this is a retry, don't try again
//       if (originalRequest?._retry) {
//         useAuthStore.getState().clearAuth();
//         window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
//         return Promise.reject(error);
//       }

//       // Mark this request as a retry
//       originalRequest._retry = true;

//       try {
//         // Try to refresh the token
//         const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/v1/auth/refresh-token`, {}, {
//           withCredentials: true
//         });

//         if (data?.token) {
//           // Update the auth store with the new token
//           useAuthStore.getState().setAuth(data.token, data.user);
          
//           // Update the Authorization header
//           originalRequest.headers.Authorization = `Bearer ${data.token}`;
          
//           // Retry the original request
//           return api(originalRequest);
//         }
//       } catch (refreshError) {
//         console.error('Failed to refresh token:', refreshError);
//         useAuthStore.getState().clearAuth();
//         window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
//       }
      
//       return Promise.reject(error);
//     }

//     // Handle other errors
//     if (status === 403) {
//       toast.error('You do not have permission to perform this action');
//     } else if (status === 404) {
//       toast.error('The requested resource was not found');
//     } else if (status && status >= 500) {
//       toast.error('A server error occurred. Please try again later.');
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

// src/api/api.ts
import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import useAuthStore from '@/stores/userAuthStore';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// List of endpoints that don't require authentication
const publicEndpoints = [
  '/v1/auth/login',
  '/v1/auth/signup',
  '/v1/auth/forgot-password',
  '/v1/auth/reset-password/:id/:token',
  '/v1/auth/google',
  '/v1/auth/github',
  '/v1/auth/google/callback',
  '/v1/auth/github/callback',
];

// Helper function to check if endpoint is public
const isPublicEndpoint = (url: string): boolean => {
  return publicEndpoints.some(endpoint => {
    if (endpoint.includes(':')) {
      // Handle parameterized routes like /reset-password/:id/:token
      const pattern = endpoint.replace(/:[^/]+/g, '[^/]+');
      return new RegExp(`${pattern}$`).test(url);
    }
    return url.endsWith(endpoint);
  });
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token && !isPublicEndpoint(config.url || '')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;
    const url = originalRequest?.url || '';

    // Handle 401 Unauthorized for protected endpoints
    if (status === 401 && !isPublicEndpoint(url) && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/auth/refresh-token`, 
          {}, 
          { withCredentials: true }
        );

        if (data?.accessToken) {
          // Get current user data to preserve it
          const currentUser = useAuthStore.getState().user;
          // Update the auth store with the new token
          useAuthStore.getState().setAuth(data.accessToken, currentUser);
          
          // Update the Authorization header
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          
          // Retry the original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        useAuthStore.getState().clearAuth();
        window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      }
      
      return Promise.reject(error);
    }

    // Handle other errors
    if (status === 403) {
      toast.error('You do not have permission to perform this action');
    } else if (status === 404) {
      toast.error('The requested resource was not found');
    } else if (status && status >= 500) {
      toast.error('A server error occurred. Please try again later.');
    }

    return Promise.reject(error);
  }
);

export default api;