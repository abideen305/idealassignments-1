const User = require("../model/user");
let passport = require("../passport/index");
const queryString = require("querystring");
const Assignment = require("../model/assignments");

exports.getLogin = (req, res) => {
  if (req.isUnauthenticated()) res.render("login", req.query);
  else res.redirect("/dashboard");
};

exports.getRegister = (req, res) => {
  if (req.isUnauthenticated()) res.render("register", req.query);
  else res.redirect("/dashboard");
};

exports.postLogin = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/signin",
  failureFlash: true,
});

exports.postSignUp = async (req, res) => {
  let formData = req.body;

  if (!formData.username || !formData.email || !formData.password) {
    const dataUrl = {
      username: formData.username.toLowerCase() || "",
      email: formData.email || "",
      error: "Please input all details",
    };
    const dataQueryString = queryString.encode(dataUrl);

    return res.redirect("/register?" + dataQueryString);
  }

  const exist = await User.findOne({ email: formData.email.toLowerCase() });
  if (exist) {
    const data = {
      username: formData.username || "",
      email: formData.email || "",
      error: "Email is already registered",
    };
    const dataQueryString = queryString.encode(data);

    return res.redirect("/signin?" + dataQueryString);
  }
  let user = {
    username: formData.username,
    email: String(formData.email).toLowerCase(),
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
      return res.redirect("/signin?error='An error occurred'");
    });
};

// Auth
exports.dashboard = async (req, res) => {
  if (req.isAuthenticated()) {
    const assignmentDetails = await Assignment.find({ email: req.user.email });
    res.render("dashboard", {
      username: req.user.username,
      data: assignmentDetails,
    });
  } else {
    res.redirect("/signin");
  }
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};
