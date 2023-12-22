const express = require("express");
const { body } = require("express-validator");
const typeoffranchise = require("../controllers/typeoffranchise");
const Typeoffranchise = require("../models/typeoffranchise");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Typeoffranchise),
  typeoffranchise.getTypeoffranchise
);
router.get("/:id", typeoffranchise.getTypeoffranchiseById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  typeoffranchise.createTypeoffranchise
);
router.put("/:id", typeoffranchise.updateTypeoffranchise);
router.delete("/:id", typeoffranchise.deleteTypeoffranchise);

module.exports = router;
