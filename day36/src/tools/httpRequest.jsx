import axios from "axios";
import { Navigate } from "react-router-dom";
export const httpRequest = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/auth",
});

httpRequest.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken){
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config;
});

let refreshPromise = null;
const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  return <Navigate to={"/login"} replace />;
}
const getNewToken = async () => {
  try{
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await fetch(`https://api.escuelajs.co/api/v1/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      })
    })

    if (response.status !==201){
      throw new Error('Unauthorized');
    }
    return response.json()
  } catch{
    return false
  }
}

httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    if (err.status === 401) {
      if (!refreshPromise) {
        refreshPromise = getNewToken();
      }
      const newToken = await refreshPromise;
      if (newToken){
        localStorage.setItem('access_token', newToken.access_token);
        localStorage.setItem('refresh_token', newToken.refresh_token);
        return httpRequest(err.config);
      } else {
        logout();

      }
    }
  }
);
