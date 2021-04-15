module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/signin");
    }
  },
  isAdmin: (req, res, next) => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.redirect("/signin");
    }
  },
};
