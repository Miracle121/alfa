const express = require("express");
const { body } = require("express-validator");
const risks = require("../controllers/risks");
const Risks = require("../models/risks");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Risks, [
    { path: "typeofrisksId", select: "name" },
    { path: "classesId", select: "name" },
  ]),
  risks.getRisks
);
router.get("/:id", risks.getRisksId);

router.post("/", [body("name").trim().isLength({ min: 3 })], risks.createRisks);
router.put("/:id", risks.updateRisks);
router.delete("/:id", risks.deleteRisks);
// router.get("/typeofrisk/:id", risks.filteringByTypeofriskId);
// router.get("/classesId/:id", risks.filteringByClasseId);

module.exports = router;
