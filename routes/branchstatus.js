const express = require("express");
const { body } = require("express-validator");
const branchstatus = require("../controllers/branchstatus");
const Branchstatus = require("../models/branchstatus");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Branchstatus), branchstatus.getBranchstatus);
router.get("/:id", branchstatus.getBranchstatusById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  branchstatus.createBranchstatus
);
router.put("/:id", branchstatus.updateBranchstatus);
router.delete("/:id", branchstatus.deleteBranchstatus);

module.exports = router;
