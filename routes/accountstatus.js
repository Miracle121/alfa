const express = require("express");
const { body } = require("express-validator");
const accountstatus = require("../controllers/accountstatus");
const Accountstatus = require("../models/accountstatus");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Accountstatus), accountstatus.getAccountstatus);
router.get("/:id", accountstatus.getAccountstatusById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  accountstatus.createAccountstatus
);
router.put("/:id", accountstatus.updateAccountstatus);
router.delete("/:id", accountstatus.deleteAccountstatus);

module.exports = router;
