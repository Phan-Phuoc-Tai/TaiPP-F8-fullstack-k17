//Custom hook: Hàm bắt đầu bằng từ khoá use
// - Được phép sử dụng các hook khác (Có sẵn của React)
// - Được phép sử dụng các custom hook khác
// - KHÔNG return JSX
import { create } from "zustand";
import { httpRequest } from "../tools/httpRequest";
export const useAuth = create((set) => {
  return {
    user:{
      name: "",
    },
    getProfile: async() => {
      try{
        const response = await httpRequest.get('/profile')
        if (response.status !== 200) {
          throw new Error('Unauthorized')
        }
        const data = response.data;
        return set({
          user: {
            name: data.name,
          }
        })
      } catch (err) {
        err.message
      }
    },
    logout: () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return set({
        user: {
          name: ""
        }
      })
    }
  };
});
