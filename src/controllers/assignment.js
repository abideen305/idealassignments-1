const Assignment = require("../model/assignments");
const fileUploader = require("../../utils/fileUploader");
const Email = require("../utils/email");
const emailTemplateforUser = require("../utils/emailTemplateUser");
const emailTemplateforAdmin = require("../utils/emailTemplateAdmin");
const config = require("../../config");
const { validateAll } = require("indicative/validator")

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
    let fileUrl 
    if(file){
      fileUrl = await fileUploader.uploadFile(file);
    }

    const data = {
      name: reqData.name,
      email: reqData.email,
      phone: reqData.phone,
      subject: reqData.subject,
      deadline: reqData.deadline,
      pageCount: reqData.pageCount,
      budget: reqData.budget,
      fileUrl,
    };

    const rules = {
      name: 'required|min:1',
      email: 'required|min:1',
      phone: 'required|min:1',
      subject: 'required|min:1',
      deadline: 'required|min:1',
      pageCount: 'required|min:1',
      budget: 'required|min:1',
  };

  const messages = {
      'name.required': 'Name is required',
      'email.required': 'Email is required',
      'phone.required': 'Phone number is required',
      'subject.required':
          'Subject is required',
      'deadline.required': 'Deadline Date is required',
      'pageCount.required': 'pageCount is required',
      'budget.required': 'budget is required',
  };

  validateAll(data,rules,messages).then(async () => {
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
  return res.render("submit", {
    success_msg: "Assignment sent successfully",
  });
  }).catch((errors) => {
    const formattedErrors = {};
    const error_msg = typeof errors === "object" &&  !Array.isArray(errors)  && errors.message 
    Array.isArray(errors) && errors.forEach(
        (error) => (formattedErrors[error.field] = error.message)
    );
   return res.render("submit", {
      fieldError: formattedErrors,
      error_msg
    });
  }
  )

  
  } catch (error) {
    console.log(error);
    res.render("submit",{
      error_msg: error.message
    });
  }
};
