const express = require("express");

const Policyblank = require("../../models/bco/policyblank");
const policyblank = require("../../controllers/bco/policyblank");

const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

const poplate = [
  {
    path: "warehous_id",
    populate: [
      { path: "policy_type_id", select: "policy_type_name" },
      { path: "statusofpolicy", select: "name" },
      { path: "branch_id", select: "branchname" },
    ],
  },
  { path: "branch_id", select: "branchname" },
  {
    path: "policy_type_id",
    populate: [
      { path: "policy_size_id", select: "name" },
      { path: "language", select: "name" },
    ],
  },
  {
    path: "policy_id",
    populate: [
      { path: "agreementsId", select: "agreementsnumber" },
      { path: "branch_id", select: "inn" },
      { path: "typeofpoliceId", select: "name" },
      { path: "statusofpolicy", select: "name" },
      { path: "statusofpayment", select: "name" },
    ],
  },
  { path: "status_blank", select: "name" },
];

router.get(
  "/",
  advancedResults(Policyblank, poplate),
  policyblank.getPolicyblank
);
router.get("/:id", policyblank.getPolicyblankById);

router.post("/", policyblank.createPolicyblank);
router.put("/:id", policyblank.updatePolicyblank);
router.delete("/:id", policyblank.deletePolicyblank);
router.get("/f/:id", policyblank.getPolicyblanknumberByTypeId);

module.exports = router;
