const express = require("express");
const { body } = require("express-validator");
const baseoffranchise = require("../controllers/baseoffranchise");
const Baseoffranchise = require("../models/baseoffranchise");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Baseoffranchise),
  baseoffranchise.getBaseoffranchise
);
router.get("/:id", baseoffranchise.getBaseoffranchiseById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  baseoffranchise.createBaseoffranchise
);
router.put("/:id", baseoffranchise.updateBaseoffranchise);
router.delete("/:id", baseoffranchise.deleteBaseoffranchise);

module.exports = router;
