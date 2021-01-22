const mongoose = require("mongoose");

const env = process.env.NODE_ENV || "development";
const config = require("../../config")[env];

mongoose.Promise = global.Promise;

let mongooseConnectionOption = {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

let connection = mongoose
  .connect(config.dbURI, mongooseConnectionOption)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
