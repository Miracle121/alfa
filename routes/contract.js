const express = require("express");
const { body } = require("express-validator");
const contract = require("../controllers/contract");
const Contract = require("../models/contractform");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Contract), contract.getContractform);
router.get("/:id", contract.getContractformById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  contract.createContractform
);
router.put("/:id", contract.updateContractform);
router.delete("/:id", contract.deleteContractform);

module.exports = router;
