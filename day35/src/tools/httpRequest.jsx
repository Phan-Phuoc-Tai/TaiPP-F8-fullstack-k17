import axios from "axios";
export const httpRequest = axios.create({
  baseURL: "https://dummyjson.com",
});

httpRequest.interceptors.request.use((config) => {
  return config;
});

httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);
