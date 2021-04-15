const router = require("express").Router();
const cAssignment = require("../controllers/assignment");
const upload = require("../middlewares/multerUpload");
const { isLoggedIn, isAdmin } = require("../middlewares/");

router.get("/submit", cAssignment.getSubmitAssignment);

router.get("/assignment/:id", isLoggedIn, cAssignment.getAssignmentDetails);

router.get("/assignment/:id/edit", isLoggedIn, cAssignment.changeStatus);

router.post(
  "/assignment/:id/edit/",
  isLoggedIn,
  isAdmin,
  cAssignment.setAmountToPay
);

router.post(
  "/submit",
  upload("assignment_file"),
  cAssignment.postSubmitAssignment
);

module.exports = router;
