const router = require("express").Router();
const cUser = require("../controllers/user");

router.get("/signin", cUser.getLogin);
router.get("/register", cUser.getRegister);

router.post("/signin", cUser.postLogin);

router.post("/signup", cUser.postSignUp);

router.post("/forgot_password", cUser.forgotPassword);

router.post("/new_password", cUser.setNewPAssword);

router.get("/dashboard", cUser.dashboard);
router.get("/all_users", cUser.getAllUser);

router.get("/logout", cUser.logout);

module.exports = router;
