const express = require("express");
const policy = require("../controllers/policy");
const Policy = require("../models/policy");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

const populateOptions = [
  { path: "branch_id", select: "inn" },
  { path: "agreement", select: "agreementsnumber" },
  { path: "policy_blanknumber", select: "blank_number" },
  { path: "typeofpoliceId", select: "name" },
  { path: "statusofpolicy", select: "name" },
  { path: "statusofpayment", select: "name" },
  { path: "objectofinsurance.typeofobjects", select: "name" },
  { path: "objectofinsurance.objects", select: "name" },
  { path: "objectofinsurance.region", select: "name" },
  { path: "objectofinsurance.districtsId", select: "name" },
  { path: "riskId.riskgroup", select: "name" },
  { path: "riskId.risk", select: "name" },
  { path: "riskId.classeId", select: "name" },
  { path: "statusofpolicy", select: "name" },
  { path: "statusofpayment", select: "name" },
];

router.get("/", advancedResults(Policy, populateOptions), policy.getPolicy);
router.get("/:id", policy.getPolicyById);

router.post("/", policy.createPolicy);
router.put("/:id", policy.updatePolicy);
router.delete("/:id", policy.deletePolicy);

module.exports = router;
