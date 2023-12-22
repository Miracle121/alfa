const express = require("express");
const positions = require("../../controllers/employee/positions");
const Positions = require("../../models/employee/positions");
const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Positions), positions.getPositions);
router.get("/:id", positions.getPositionsById);

router.post("/", positions.createPositions);
router.put("/:id", positions.updatePositions);
router.delete("/:id", positions.deletePositions);

module.exports = router;
