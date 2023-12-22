const express = require("express");
const transaction = require("../../controllers/billing/transaction");
const Transaction = require("../../models/billing/transactions");
const IsAuth = require("../../middleware/is-auth");
const upload = require("../../middleware/upload");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Transaction), transaction.getTransaction);
router.get("/:id", transaction.getTransactionById);

router.post("/", upload.single("files"), transaction.createTransaction);
router.put("/:id", transaction.updateTransaction);
router.delete("/:id", transaction.deleteTransaction);

module.exports = router;
