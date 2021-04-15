const axios = require("axios");
const { paystackSecretKey } = require("../../config");
const Transaction = require("../model/transaction");
const Assignment = require("../model/assignments");

exports.getAllTransaction = async (req, res) => {
  const user = req.user;

  const transData = await Transaction.find({ userEmail: user.email });
  return res.render("transactions", {
    data: transData,
  });
};

exports.saveTransaction = async (req, res) => {
  const data = {
    reference: req.body.reference,
    userEmail: req.body.userEmail,
    amount: req.body.amount,
    assignmentId: req.body.assignmentId,
    status: req.body.status,
  };

  const trx = new Transaction(data);
  await trx.save();

  return res.send("transaction saved successfully");
};

exports.verifyTransaction = async (req, res) => {
  const refId = req.params.refId;
  const { data: transactionData } = await axios.get(
    `https://api.paystack.co/transaction/verify/${refId}`,
    {
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
      },
    }
  );
  const {
    data: { reference, status, amount, metadata },
  } = transactionData;

  const data = {
    reference,
    userEmail: metadata.customerEmail,
    amount: amount / 100,
    assignmentId: metadata.assignmentId,
    status,
  };

  const trx = new Transaction(data);
  await trx.save();

  const assignment = await Assignment.findById(data.assignmentId);
  let message;

  if (data.status === "success") {
    if (assignment.paymentRefs.includes(data.reference)) {
      message = "Payment already accepted";
    } else {
      await Assignment.findByIdAndUpdate(data.assignmentId, {
        amountPaid: assignment.amountPaid + data.amount,
        $push: { paymentRefs: data.reference },
      });
      message = "Payment approved successfully";
    }
  }

  res.redirect(`/assignment/${data.assignmentId}?message=${message}`);
};
