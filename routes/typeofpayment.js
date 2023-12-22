const express = require("express");
const { body } = require("express-validator");
const typeofpayment = require("../controllers/typeofpayment");
const Typeofpayment = require("../models/typeofpayment");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Typeofpayment), typeofpayment.getTypeofpayment);
router.get("/:id", typeofpayment.getTypeofpaymentId);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  typeofpayment.createTypeofpayment
);
router.put("/:id", typeofpayment.updateTypeofpayment);
router.delete("/:id", typeofpayment.deleteTypeofpayment);

module.exports = router;
