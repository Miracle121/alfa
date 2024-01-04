const express = require("express");
const { body } = require("express-validator");
const typeofendorsements = require("../controllers/typeofendorsements");
const Typeofendorsements = require("../models/typeofendorsements");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Typeofendorsements),
  typeofendorsements.getTypeofendorsements
);
router.get("/:id", typeofendorsements.getTypeofendorsementsById);

router.post("/", typeofendorsements.createTypeOfendorsements);
router.put("/:id", typeofendorsements.updateTypeofendorsements);
router.delete("/:id", typeofendorsements.deleteTypeOfendorsements);

module.exports = router;
