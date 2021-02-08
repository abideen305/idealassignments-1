const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const assignmentSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: String,
    subject: String,
    fileUrl: String,
    deadline: String,
    pageCount: String,
    budget: String,
    status: {
      type: String,
      enum: ["In review", "In process", "Cancelled", "solved"],
      default: "In review",
    },
  },
  {
    timestamps: true,
  }
);

let assignments = mongoose.model("Assignments", assignmentSchema);
module.exports = assignments;
