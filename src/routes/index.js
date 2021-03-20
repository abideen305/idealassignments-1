const router = require("express").Router();
const usersRoute = require("./user");
const assignmentRoute = require("./assignment");

router.get("/", (req, res) => {
  res.render("index", {
    ...req.body,
    ...req.query,
  });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/about", (req, res) => {
  res.render("about", {
    ...req.body,
    ...req.query,
  });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    ...req.body,
    ...req.query,
  });
});

router.get("/business", (req, res) => {
  res.render("business", {
    ...req.body,
    ...req.query,
  });
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    ...req.body,
    ...req.query,
  });
});

router.get("/essay", (req, res) => {
  res.render("essay", {
    ...req.body,
    ...req.query,
  });
});

router.get("/generalassignment", (req, res) => {
  res.render("generalassignment", {
    ...req.body,
    ...req.query,
  });
});

router.get("/stat", (req, res) => {
  res.render("stat", {
    ...req.body,
    ...req.query,
  });
});

router.get("/portfolio", (req, res) => {
  res.render("portfolio", {
    ...req.body,
    ...req.query,
  });
});

router.get("/submit", (req, res) => {
  res.render("submit", {
    ...req.body,
    ...req.query,
  });
});

router.use(usersRoute);
router.use(assignmentRoute);

module.exports = router;
