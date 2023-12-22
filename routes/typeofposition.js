const express = require("express");
const typeofposition = require("../controllers/typeofposition");
const Typeofposition = require("../models/typeofposition");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Typeofposition),
  typeofposition.getTypeofposition
);
router.get("/:id", typeofposition.getTypeofpositionId);

router.post("/", typeofposition.createTypeofposition);
router.put("/:id", typeofposition.updateTypeofposition);
router.delete("/:id", typeofposition.deleteTypeofposition);

module.exports = router;
