const express = require("express");
const { body } = require("express-validator");
const regions = require("../controllers/regions");
const Regions = require("../models/regions");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Regions, { path: "districts", select: "name" }),
  regions.getRegions
);
router.get("/:id", regions.getRegionsById);
router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  regions.createRegions
);
router.put("/:id", regions.updateRegions);
router.delete("/:id", regions.deleteRegions);

module.exports = router;
