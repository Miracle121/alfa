const express = require("express");
const transactionlog = require("../../controllers/billing/transactionlog");
const Transactionlog = require("../../models/billing/transactionlog");
const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Transactionlog),
  transactionlog.getTransactionlog
);
router.get("/:id", transactionlog.getTransactionlogById);

router.post("/", transactionlog.createTransactionlog);
router.put("/:id", transactionlog.updateTransactionlog);
router.delete("/:id", transactionlog.deleteTransactionlog);
router.post("/transaction_date/:id", transactionlog.transaction_date);

module.exports = router;
