const authService = require("../services/auth.service");

module.exports = {
  index: (request, response) => {
    if (request.session.user) {
      return response.redirect("/");
    }
    return response.render("login");
  },
  login: (request, response) => {
    if (request.session.user) {
      return response.redirect("/");
    }
    const { email, password } = request.body;

    try {
      const user = authService.login(email, password);
      request.session.user = user;
      request.flash("success", "Đăng nhập thành công");
      return response.redirect("/");
    } catch (error) {
      request.flash("error", error.message);
      return response.redirect("/login");
    }
  },
  logout: (request, response) => {
    delete request.session.user;
    request.flash("success", "Đăng xuất thành công");
    return response.redirect("/login");
  },
};
