import axios from "axios";

const appAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

appAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      if (!config.headers) {
        config.headers = {}; 
      }
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
  
);
appAxios.interceptors.response.use(
  response => response,
  error => {
    console.error();
    if (error.response) {
      if (error.message.includes('Network Error') || error.code === 'ERR_NETWORK') {
        const event = new CustomEvent('network-error', { detail: { message: 'Network Error' } });
        window.dispatchEvent(event);
      }
    }
    return Promise.reject(error);
  }
);

export default appAxios;
