const User = require("../model/user");
let passport = require("../passport/index");
const queryString = require("querystring");

exports.getLogin = (req, res) => {
  if (req.isUnauthenticated()) res.render("login", req.query);
  else res.redirect("/dashboard");
};

exports.postLogin = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/auth",
  failureFlash: true,
});

// exports.getSignUp = (req, res) => {
//   if (req.isUnauthenticated()) res.render("signup");
//   else res.redirect("/dashboard");
// };

exports.postSignUp = async (req, res) => {
  let formData = req.body;

  if (!formData.username || !formData.email || !formData.password) {
    const dataUrl = {
      username: formData.username || "",
      email: formData.email || "",
      signupPanel: true,
      error: "Please input all details",
    };
    const dataQueryString = queryString.encode(dataUrl);

    return res.redirect("/auth" + dataQueryString);
  }

  const exist = await User.findOne({ email: formData.email });
  if (exist) {
    const data = {
      username: formData.username || "",
      email: formData.email || "",
      signupPanel: true,
      error: "Email is already registered",
    };
    const dataQueryString = queryString.encode(data);

    return res.redirect("/auth?" + dataQueryString);
  }
  let user = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
  };

  User.create(user)
    .then((user) => {
      req.login(user, (err) => {
        if (err) next(err);
        res.redirect("/dashboard");
      });
    })
    .catch((err) => {
      return res.redirect("/auth?error='An error occurred'");
    });
};

// Auth
exports.dashboard = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("dashboard");
  } else {
    res.redirect("/auth");
  }
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};
