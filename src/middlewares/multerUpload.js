const multer = require("multer");

// const auth = require("../middleware/auth");

//to define how the file shoul be stored
const storage = multer.memoryStorage();

//to initialize multer (dest specify the folder the data should be upload)
const upload = (assignment_file) =>
  multer({
    storage: storage,
    limits: { filesize: 1024 * 1024 * 10 },
  }).single(assignment_file);

module.exports = upload;
