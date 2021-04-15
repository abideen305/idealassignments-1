const mongoose = require("mongoose");

const env = process.env.NODE_ENV || "development";
const config = require("../../config")[env];

let mongooseConnectionOption = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const connectDb = (cb = () => {}) => {
  mongoose
    .connect(config.dbURI, mongooseConnectionOption)
    .then(() => {
      console.log("DB connected");
      cb(mongoose.connection);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDb;
