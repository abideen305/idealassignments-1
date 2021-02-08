const { cloudinary } = require("../config");
const streamifier = require("streamifier");

const uploadFile = async (filedata) => {
  const rand = Date.now().toString(16) + Math.random().toString(16);

  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", public_id: rand + filedata.originalname },
      (error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(filedata.buffer).pipe(stream);
  });
};

module.exports = {
  uploadFile,
};
