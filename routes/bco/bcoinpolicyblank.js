const express = require("express");

const Bcoinpolicyblank = require("../../models/bco/bcoinpolicyblank");
const bcoinpolicyblank = require("../../controllers/bco/bcoinpolicyblank");

const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

const populateOptions = [
  { path: "policy_type_id", select: "policy_type_name" },
  {
    path: "bco_id",
    populate: [
      {
        path: "policy_type_id",
        select: "policy_type_name",
      },
      {
        path: "policy_blank_number",
        select: "blank_number",
      },
      {
        path: "branch_id",
        select: "branchname",
      },
      {
        path: "employee_id",
        select: "name",
      },
      {
        path: "statusofbcopolicy",
        select: "name",
      },
    ],
  },
  { path: "policy_blank_number", select: "blank_number" },
];

router.get(
  "/",
  advancedResults(Bcoinpolicyblank, populateOptions),
  bcoinpolicyblank.getBcoinpolicyblank
);
router.get("/:id", bcoinpolicyblank.getBcoinpolicyblankById);

router.post("/", bcoinpolicyblank.createBcoinpolicyblank);
router.put("/:id", bcoinpolicyblank.updateBcoinpolicyblank);
router.delete("/:id", bcoinpolicyblank.deleteBcoinpolicyblank);

module.exports = router;
