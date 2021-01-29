const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
const {
  SMTP_USERNAME,
  SMTP_PASSWORD,
  FROM_EMAIL,
  BASE_URL,
} = require("../../config");
const transporter = nodemailer.createTransport({
  host: "idealassignmentshelp.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const URL =
  process.env.NODE_ENV === "production" ? BASE_URL : "http://localhost:4000";

const Email = () => {
  return {
    header: (data) => {
      const from = data.from || FROM_EMAIL;
      const { to } = data;
      const { subject } = data;
      return {
        from,
        to,
        subject,
      };
    },

    sendMail: async (header, template) => {
      try {
        const response = await transporter.sendMail({
          ...header,
          ...template,
        });
        return response;
      } catch (error) {
        return error;
      }
    },
  };
};

module.exports = Email();
