const router = require("express").Router();
const cTransation = require("../controllers/transaction");
const { isLoggedIn } = require("../middlewares/");

router.get("/transactions", isLoggedIn, cTransation.getAllTransaction);

router.post("/transactions", isLoggedIn, cTransation.saveTransaction);

router.get(
  "/verify_transaction/:refId",
  isLoggedIn,
  cTransation.verifyTransaction
);

module.exports = router;
