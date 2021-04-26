const User = require("../model/user");
let passport = require("../passport/index");
const queryString = require("querystring");
const Assignment = require("../model/assignments");
const resetPassword = require("../utils/resetPassword");
const generateToken = require("../utils/generateToken");
const config = require("../../config");
const moment = require("moment");
const Token = require("../model/token");
const Email = require("../utils/email");

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
    username: String(formData.username).toLowerCase(),
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
    const query = req.user.isAdmin ? {} : { email: req.user.email };
    const assignmentDetails = await Assignment.find(query);
    res.render("dashboard", {
      username: req.user.username,
      data: assignmentDetails,
    });
  } else {
    res.redirect("/signin");
  }
};

exports.forgotPassword = async (req, res) => {
  const user = req.body.user;
  const pipeline = [{ $match: { $or: [{ email: user }, { username: user }] } }];

  const userData = await User.aggregate(pipeline);

  if (userData.length !== 0) {
    const userDetails = userData[0];
    const token = generateToken();
    const URL =
      process.env.NODE_ENV === "production"
        ? config.BASE_URL
        : "http://localhost:4000";
    const resetUrl = URL + "/new_password?token=" + token;

    const message = resetPassword(userDetails.username, resetUrl, URL);

    await new Token({
      token,
      user: userDetails._id,
      expiryDate: moment().add(30, "m").toDate(),
    }).save();

    const headers = Email.header({
      to: userDetails.email,
      subject: "Reset Password - IdealAssignment",
    });

    await Email.sendMail(headers, message);

    return res.render("forgot_password", {
      success_msg: "Password reset instruction sent successfully",
    });
  }

  res.render("forgot_password", {
    error_msg: "User not found",
  });
};

exports.setNewPAssword = async (req, res) => {
  const { password, password2, token } = req.body;
  const tokenData = await Token.findOne({ token: token.trim() });

  if (!tokenData) {
    return res.render("new_password", {
      error: "Token Doesn't exist",
    });
  }

  if (password !== password2) {
    return res.render("new_password", {
      error: "Password don't match",
      token,
    });
  }

  if (moment(tokenData.expiryDate).isBefore(new Date(), "minute")) {
    return res.render("new_password", {
      error: "Token Expired",
    });
  }

  const user = await User.findById(tokenData.user);
  await user.updatePassword(password);

  await Token.findByIdAndDelete(tokenData._id);

  return res.redirect(
    "/signin?success_msg=Password reset successfull, you can login now"
  );
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};
