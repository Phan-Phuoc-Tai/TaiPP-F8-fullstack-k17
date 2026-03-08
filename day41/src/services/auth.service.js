const USER = {
  name: "Tài",
  email: "admin@gmail.com",
  password: "123456",
};
module.exports = {
  login: (email, password) => {
    if (!email || !password) {
      throw new Error("Vui lòng nhập đầy đủ thông tin!");
    }
    if (email !== USER.email || password !== USER.password) {
      throw new Error("Email hoặc mật khẩu không chính xác.");
    }
    const { password: _, ...safeUser } = USER;
    return safeUser;
  },
};
