const { cloudinary } = require("../config");
// const path = require("path");
const streamifier = require("streamifier");

// const DatauriParser = require("datauri/parser");
// const parser = new DatauriParser();

// const dataUri = (file) => {
//   const fileBuffer = file.buffer;
//   const fileExt = path.extname(file.originalname).toString();
//   const { base64 } = parser.format(fileExt, fileBuffer);
//   return base64;
// };

const uploadFile = async (filedata) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result.secure_url);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(filedata.buffer).pipe(stream);
  });
};

module.exports = {
  uploadFile,
};
