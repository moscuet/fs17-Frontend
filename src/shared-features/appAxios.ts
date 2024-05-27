import axios from "axios";

const appAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

appAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    console.log("token", token);
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

export default appAxios;
