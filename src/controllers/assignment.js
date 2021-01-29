const Assignment = require("../model/assignments");
const fileUploader = require("../../utils/fileUploader");
const Email = require("../utils/email");
const emailTemplateforUser = require("../utils/emailTemplateUser");
const emailTemplateforAdmin = require("../utils/emailTemplateAdmin");
const config = require("../../config");

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
    const fileUrl = await fileUploader.uploadFile(file);

    const data = {
      email: reqData.email,
      phone: reqData.phone,
      subject: reqData.subject,
      deadline: reqData.deadline,
      pageCount: reqData.pageCount,
      budget: reqData.budget,
      fileUrl,
    };

    const URL =
      process.env.NODE_ENV === "production"
        ? BASE_URL
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
    const adminMsg = emailTemplateforAdmin(editProgressUrl, paymentUrl, data);

    const headers = Email.header({
      to: data.email,
      subject: "Assignment Submission details",
    });
    const adminHeaders = Email.header({
      to: config.FROM_EMAIL,
      subject: "New assignment Submission",
    });

    await Email.sendMail(headers, msg);
    await Email.sendMail(adminHeaders, adminMsg);
    // console.log(aa, bb);
    return res.render("submit", {
      success_msg: "Assignment sent successfully",
    });
  } catch (error) {
    console.log(error);
    req.flash("error_msg", error.message);
  }
};
