const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

//to define how the file shoul be stored
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.resolve(__dirname, "../../uploads"));
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname +
        "-" +
        crypto.randomBytes(16).toString("hex") +
        path.extname(file.originalname)
    );
  },
});

//to initialize multer (dest specify the folder the data should be upload)
const upload = (assignment_file) =>
  multer({
    storage: storage,
    // limits: { filesize: 1024 * 1024 * 10 },
  }).array(assignment_file);

module.exports = upload;
