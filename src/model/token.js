const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    token: String,
    expiryDate: Date,
    user: String,
  },
  {
    timestamps: true,
  }
);

let tokenModel = mongoose.model("Token", tokenSchema);
module.exports = tokenModel;
