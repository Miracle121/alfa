const express = require("express");
const fieldofendorsements = require("../controllers/fieldofendorsements");
const Fieldofendorsements = require("../models/fieldofendorsements");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Fieldofendorsements),
  fieldofendorsements.getFieldofendorsements
);
router.get("/:id", fieldofendorsements.getFieldofendorsementsById);

router.post("/", fieldofendorsements.createFieldofendorsements);
router.put("/:id", fieldofendorsements.updateFieldofendorsements);
router.delete("/:id", fieldofendorsements.deleteFieldofendorsements);

module.exports = router;
