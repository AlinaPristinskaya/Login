import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://185.151.247.203/yms/portalAPI/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

/* axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = store.state.auth;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
); */

export default axiosInstance;
