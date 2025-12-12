const instance = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});

instance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

let refreshPromise = null;
const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "index.html";
};

const getNewToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await fetch(`${SERVER_AUTH}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) {
      throw new Error("Unauthorized");
    }
    return response.json();
  } catch {
    return false;
  }
};

instance.interceptors.response.use(
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
        //lưu vào localStorage
        localStorage.setItem("access_token", newToken.access_token);
        localStorage.setItem("refresh_token", newToken.refresh_token);
        //Gọi lại request bị failed
        return instance(error.config);
      } else {
        //logout
        handleLogout();
      }
    }
    return Promise.reject(error);
  }
);
