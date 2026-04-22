import axios from "axios";

export const httpRequest = axios.create();

httpRequest.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise = null;
const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

const getNewToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await httpRequest.post(`/refresh-token`, {
      refreshToken,
    });

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    return response.data;
  } catch {
    return false;
  }
};

httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.status === 401) {
      if (!refreshPromise) {
        refreshPromise = getNewToken();
      }
      const newToken = await refreshPromise;
      if (newToken) {
        //Lưu vào localStorage
        localStorage.setItem("access_token", newToken.access_token);
        localStorage.setItem("refresh_token", newToken.refresh_token);
        //Gọi lại request  bị failed
        return httpRequest(error.config);
      } else {
        //Logout
        logout();
      }
    }
    return Promise.reject(error);
  },
);
