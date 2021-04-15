require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  FROM_EMAIL: process.env.FROM_EMAIL,
  BASE_URL: process.env.BASE_URL,
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
  development: {
    dbURI: process.env.DBURIDEV,
  },

  production: {
    dbURI: process.env.DBURIPROD,
  },
  cloudinary,
};
