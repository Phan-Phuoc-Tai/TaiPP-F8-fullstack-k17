import { User } from "../types/user.type";

const users: User[] = [
  {
    fullName: "PT",
    email: "pt@gmail.com",
    password: "123456",
  },
];

export const authService = {
  register: (formData: User) => {
    const userExits = users.some((user) => user.email === formData.email);
    if (userExits) {
      throw new Error("Email đã tồn tại! Vui lòng sử dụng email khác");
    }
    users.push(formData);
    const newUser = {
      email: formData.email,
      fullName: formData.fullName,
    };
    return newUser;
  },

  login: (formData: User) => {
    const userValid = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password,
    );
    if (!userValid) {
      throw new Error("Email hoặc mật khẩu không chính xác");
    }
    const safeUser = {
      email: userValid.email,
      fullName: userValid.fullName,
    };
    return safeUser;
  },
};
