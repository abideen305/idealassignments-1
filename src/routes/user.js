const router = require("express").Router();
const cUser = require("../controllers/user");

router.get("/signin", cUser.getLogin);
router.get("/register", cUser.getRegister);

router.post("/signin", cUser.postLogin);

router.post("/signup", cUser.postSignUp);

router.get("/dashboard", cUser.dashboard);

router.get("/logout", cUser.logout);

module.exports = router;
