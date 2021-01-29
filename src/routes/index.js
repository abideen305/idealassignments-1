const router = require("express").Router();
const usersRoute = require("./user");
const assignmentRoute = require("./assignment");

router.get("/", (req, res) => {
  res.render("index");
});

router.use(usersRoute);
router.use("/assignment", assignmentRoute);

module.exports = router;
