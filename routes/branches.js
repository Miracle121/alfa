const express = require("express");
const { body } = require("express-validator");
const branches = require("../controllers/branches");
const Branches = require("../models/branches");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

const populateOptions = [
  { path: "region", select: "name" },
  { path: "branchstatus", select: "name" },
  {
    path: "employees",
    populate: [{ path: "positions", select: "name" }],
  },
  { path: "policy", select: "policy_number", populate: { path: "agreement" } },
];

router.get(
  "/",
  advancedResults(Branches, populateOptions),
  branches.getBranches
);

router.get("/:id", branches.getBranchesById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  branches.createBranches
);
router.put("/:id", branches.updateBranches);
router.delete("/:id", branches.deleteBranches);

module.exports = router;
