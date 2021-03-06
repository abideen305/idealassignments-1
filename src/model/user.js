const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 4,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      required: true,
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// instance methods
userSchema.methods = {
  // e.g
  updatePassword(password) {
    const user = this;
    // presave hook will hash the password
    user.password = password;
    return user.save();
  },
};

// model methods... a wrapper to contain all methods available to the model
userSchema.statics = {
  authenticate(email, password) {
    let User = this;
    return User.findOne({
      email,
    }).then((user) => {
      if (!user)
        return Promise.reject({
          msg: "User does not exist",
        });

      let isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch)
        return Promise.reject({
          msg: "Incorrect Password",
        });
      else {
        return user;
      }
    });
  },
};

userSchema.pre(
  "save",
  function (next) {
    let user = this;
    if (user.isModified("password")) {
      console.log(user);
      let salt = bcrypt.genSaltSync(10);
      if (!salt) next(false);
      let hashedPassword = bcrypt.hashSync(user.password, salt);
      if (!hashedPassword) next(false);
      user.password = hashedPassword;
      next();
    }
  },
  {
    timestamps: true,
  }
);

let Users = mongoose.model("Users", userSchema);
module.exports = Users;
