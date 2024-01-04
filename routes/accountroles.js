const express = require("express");
const { body } = require("express-validator");
const accountroles = require("../controllers/accountroles");
const Accountroles = require("../models/accountroles");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Accountroles), accountroles.getAccountroles);
router.get("/:id", accountroles.getAccountrolesById);

router.post(
  "/",

  [body("name").trim().isLength({ min: 3 })],
  accountroles.createAccountroles
);
router.put("/:id", accountroles.updateAccountroles);
router.delete("/:id", accountroles.deleteAccountroles);

module.exports = router;
