import { httpRequest } from "@/utils/httpRequest";
import { create } from "zustand";
import { toast } from "sonner";
export const useAuth = create((set) => {
  const API_AUTH = `https://api.escuelajs.co/api/v1/auth`;
  return {
    user: {
      name: "",
    },
    isAuthenticated: false,
    isLoading: true,
    token: "",
    login: (accessToken, refreshToken) => {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      toast.success("Log in successfully", {
        position: "top-right",
        richColors: true,
      });
      return set({
        token: accessToken,
        isAuthenticated: true,
      });
    },
    getProfile: async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          return;
        }
        const response = await httpRequest.get(`${API_AUTH}/profile`);
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        const data = response.data;
        return set({
          user: {
            name: data.name,
          },
          isAuthenticated: true,
        });
      } catch (error) {
        toast.error(error.message, { position: "top-right", richColors: true });
      } finally {
        set({
          isLoading: false,
        });
      }
    },
    logout: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return set({
        user: {
          name: "",
        },
        isAuthenticated: false,
        isLoading: false,
        token: "",
      });
    },
  };
});
