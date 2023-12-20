const express = require("express");

const Statusbcopolicy = require("../../models/bco/statusbcopolicy");
const statusbcopolicy = require("../../controllers/bco/statusbcopolicy");

const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Statusbcopolicy),
  statusbcopolicy.getStatusbcopolicy
);
router.get("/:id", statusbcopolicy.getStatusbcopolicyById);

router.post("/", statusbcopolicy.createStatusbcopolicy);
router.put("/:id", statusbcopolicy.updateStatusbcopolicy);
router.delete("/:id", statusbcopolicy.deleteStatusbcopolicy);

module.exports = router;
