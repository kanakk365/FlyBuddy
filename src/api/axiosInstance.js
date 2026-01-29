import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const axiosInstance = axios.create({
  baseURL: "https://flybuddyapi.theflybuddy.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      // Assuming zustand persist is used with key 'auth-storage'
      const storageData = localStorage.getItem("auth-storage");
      if (storageData) {
        const { state } = JSON.parse(storageData);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      }
    } catch (error) {
      console.error("Error reading token from local storage", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 413 || error.response.status === 401)
    ) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
