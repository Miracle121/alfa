const express = require("express");

const StatusActs = require("../../models/bco/status_acts");
const statusActs = require("../../controllers/bco/status_acts");

const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(StatusActs), statusActs.getStatusActs);
router.get("/:id", statusActs.getStatusActsById);

router.post("/", statusActs.createStatusActs);
router.put("/:id", statusActs.updateStatusActs);
router.delete("/:id", statusActs.deleteStatusActs);

module.exports = router;
