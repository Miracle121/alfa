const express = require("express");
const paymentcurrency = require("../controllers/paymentcurrency");
const Paymentcurrency = require("../models/paymentcurrency");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Paymentcurrency),
  paymentcurrency.getPaymentcurrency
);
router.get("/:id", paymentcurrency.getPaymentcurrencyId);

router.post("/", paymentcurrency.createPaymentcurrency);
router.put("/:id", paymentcurrency.updatePaymentcurrency);
router.delete("/:id", paymentcurrency.deletePaymentcurrency);

module.exports = router;
