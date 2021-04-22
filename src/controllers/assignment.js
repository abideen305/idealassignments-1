const Assignment = require("../model/assignments");
const fileUploader = require("../../utils/fileUploader");
const Email = require("../utils/email");
const emailTemplateforUser = require("../utils/emailTemplateUser");
const emailTemplateforAdmin = require("../utils/emailTemplateAdmin");
const config = require("../../config");
const { validateAll } = require("indicative/validator");
const querystring = require("querystring");

exports.getSubmitAssignment = (req, res) => {
  return res.render("submit", {
    user: req.user,
    isAuthenticated: req.isAuthenticated(),
    ...req.query,
  });
};

exports.getAssignmentDetails = async (req, res) => {
  const appURL =
    process.env.NODE_ENV === "production"
      ? config.BASE_URL
      : "http://localhost:4000";
  const data = await Assignment.findById(req.params.id);
  if (!data) return res.redirect("/dashboard");
  return res.render("assignment_details", {
    data,
    user: req.user,
    appURL,
    message: req.query.message,
  });
};

exports.postSubmitAssignment = async (req, res) => {
  try {
    const reqData = req.body;
    const username = req.user ? req.user.username : null;
    const { file } = req;
    let fileUrl;
    if (file) {
      fileUrl = await fileUploader.uploadFile(file);
    }

    const data = {
      title: reqData.title,
      email: reqData.email,
      subject: reqData.subject,
      deadline: reqData.deadline,
      fileUrl,
    };

    const rules = {
      email: "required|min:1",
      subject: "required|min:1",
      deadline: "required|min:1",
    };

    const messages = {
      "email.required": "Email is required",
      "subject.required": "Subject is required",
      "deadline.required": "Deadline Date is required",
    };

    validateAll(data, rules, messages)
      .then(async () => {
        const URL =
          process.env.NODE_ENV === "production"
            ? config.BASE_URL
            : "http://localhost:4000";
        const assignment = new Assignment(data);
        const savedData = await assignment.save();
        const assignmentURL = `${URL}/assignment/${savedData.id}`;

        const msg = emailTemplateforUser(assignmentURL, username || "", data);
        const adminMsg = emailTemplateforAdmin(assignmentURL, data);

        const headers = Email.header({
          to: data.email,
          subject: "Assignment Submission details",
        });
        const adminHeaders = Email.header({
          to: config.FROM_EMAIL,
          subject: "New assignment Submission",
        });

        await Email.sendMail(adminHeaders, adminMsg);

        res.redirect(
          reqData.from +
            "?" +
            querystring.stringify({
              success_msg: "Assignment sent successfully",
            })
        );
        await Email.sendMail(headers, msg);
      })
      .catch((errors) => {
        const formattedErrors = {};
        const error_msg =
          typeof errors === "object" && !Array.isArray(errors)
            ? errors.message
            : null;

        Array.isArray(errors) &&
          errors.forEach(
            (error) => (formattedErrors[error.field] = error.message)
          );
        res.redirect(
          reqData.from +
            "?" +
            querystring.stringify({
              ...formattedErrors,
              error_msg,
            })
        );
      });
  } catch (error) {
    console.log(error);
    res.redirect(
      reqData.from +
        "?" +
        querystring.stringify({
          error_msg: error.message,
        })
    );
  }
};

exports.changeStatus = async (req, res) => {
  const status = req.query.status;
  const id = req.params.id;
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    );

    return res.render("assignment_details", {
      data: assignment,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.setAmountToPay = async (req, res) => {
  const { amount } = req.body;
  const id = req.params.id;
  try {
    await Assignment.findByIdAndUpdate(
      id,
      {
        amountToPay: amount,
      },
      { new: true }
    );

    return res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};
