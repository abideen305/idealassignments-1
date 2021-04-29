const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: String,
    amountToPay: {
      type: Number,
      default: 0,
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
    phone: String,
    subject: String,
    fileUrl: String,
    deadline: String,
    pageCount: String,
    budget: String,
    status: {
      type: String,
      enum: ["pending", "cancelled", "rejected", "solved"],
      default: "pending",
    },
    paymentRefs: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

let assignments = mongoose.model("Assignments", assignmentSchema);
module.exports = assignments;
