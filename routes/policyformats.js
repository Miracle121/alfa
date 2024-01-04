const express = require("express");
const { body } = require("express-validator");
const policyformats = require("../controllers/policyformats");
const Policyformats = require("../models/policyformats");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Policyformats), policyformats.getPolicyformats);
router.get("/:id", policyformats.getPolicyformatsId);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  policyformats.createPolicyformats
);
router.put("/:id", policyformats.updatePolicyformats);
router.delete("/:id", policyformats.deletePolicyformats);

module.exports = router;
