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
    isAuthenticate: req.isAuthenticated(),
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
        const progressUrl = `${URL}/assignment/${savedData.id}`;
        const cancelUrl = `${URL}/assignment/${savedData.id}/cancel`;
        const editProgressUrl = `${URL}/assignment/${savedData.id}/edit`;
        const paymentUrl = `${URL}/assignment/${savedData.id}/pay`;

        const msg = emailTemplateforUser(
          progressUrl,
          cancelUrl,
          username || "",
          data
        );
        const adminMsg = emailTemplateforAdmin(
          editProgressUrl,
          paymentUrl,
          data
        );

        const headers = Email.header({
          to: data.email,
          subject: "Assignment Submission details",
        });
        const adminHeaders = Email.header({
          to: config.FROM_EMAIL,
          subject: "New assignment Submission",
        });

        res.redirect(
          reqData.from +
            "?" +
            querystring.stringify({
              success_msg: "Assignment sent successfully",
            })
        );
        await Email.sendMail(headers, msg);
        await Email.sendMail(adminHeaders, adminMsg);
      })
      .catch((errors) => {
        const formattedErrors = {};
        const error_msg =
          typeof errors === "object" &&
          !Array.isArray(errors) &&
          errors.message;

        Array.isArray(errors) &&
          errors.forEach(
            (error) => (formattedErrors[error.field] = error.message)
          );
        console.log(formattedErrors);
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
    res.redirect(
      reqData.from +
        "?" +
        querystring.stringify({
          error_msg: error.message,
        })
    );
  }
};
