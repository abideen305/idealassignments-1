const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    assignmentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let transaction = mongoose.model("Transaction", transactionSchema);
module.exports = transaction;
