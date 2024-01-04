const express = require("express");

const StatusBco = require("../../models/bco/status_bco");
const statusBco = require("../../controllers/bco/status_bco");

const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(StatusBco), statusBco.getStatusBco);
router.get("/:id", statusBco.getStatusBcoById);

router.post("/", statusBco.createStatusBco);
router.put("/:id", statusBco.updateStatusBco);
router.delete("/:id", statusBco.deleteStatusBco);

module.exports = router;
