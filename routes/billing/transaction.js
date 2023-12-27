const express = require("express");
const transaction = require("../../controllers/billing/transaction");
const Transaction = require("../../models/billing/transactions");
const IsAuth = require("../../middleware/is-auth");
const upload = require("../../middleware/upload");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Transaction, [
    {
      path: "client",
      select:
        "forindividualsdata.middlename forindividualsdata.secondname forindividualsdata.name",
    },
    {
      path: "branch",
      select: "branchname",
      populate: [
        { path: "policies", select: "policy_number" },
        { path: "blanks" },
      ],
    },
    { path: "region", select: "name" },
    { path: "district", select: "name" },
  ]),
  transaction.getTransaction
);
router.get("/:id", transaction.getTransactionById);

router.post("/", upload.single("files"), transaction.createTransaction);
router.put("/:id", transaction.updateTransaction);
router.delete("/:id", transaction.deleteTransaction);

module.exports = router;
