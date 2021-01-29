const router = require("express").Router();
const cUser = require("../controllers/user");

router.get("/auth", cUser.getLogin);

router.post("/login", cUser.postLogin);

// router.get("/signup", cUser.getSignUp);

router.post("/signup", cUser.postSignUp);

router.get("/dashboard", cUser.dashboard);

router.get("/logout", cUser.logout);

module.exports = router;
