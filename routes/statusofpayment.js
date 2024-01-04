const express = require("express");
const statusofpayment = require("../controllers/statusofpayment");
const Statusofpayment = require("../models/statusofpayment");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Statusofpayment),
  statusofpayment.getStatusofpayment
);
router.get("/:id", statusofpayment.getStatusofpaymentById);
router.post("/", statusofpayment.createStatusofpayment);
router.put("/:id", statusofpayment.updateStatusofpayment);
router.delete("/:id", statusofpayment.deleteStatusofpayment);

module.exports = router;
