const express = require("express");
const statusofpolicy = require("../controllers/statusofpolicy");
const Statusofpolicy = require("../models/statusofpolicy");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Statusofpolicy),
  statusofpolicy.getStatusofpolicy
);
router.get("/:id", statusofpolicy.getStatusofpolicyById);
router.post("/", statusofpolicy.createStatusofpolicy);
router.put("/:id", statusofpolicy.updateStatusofpolicy);
router.delete("/:id", statusofpolicy.deleteStatusofpolicy);

module.exports = router;
