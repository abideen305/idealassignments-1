const router = require("express").Router();
const cAssignment = require("../controllers/assignment");
const upload = require("../middlewares/multerUpload");

router.get("/submit", cAssignment.getSubmitAssignment);

router.post(
  "/submit",
  upload("assignment_file"),
  cAssignment.postSubmitAssignment
);

module.exports = router;
