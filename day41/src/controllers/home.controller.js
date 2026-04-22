module.exports = {
  index: (request, response) => {
    if (!request.session.user) {
      return response.redirect("/login");
    }
    return response.render("home", {
      name: request.session.user.name,
    });
  },
};
