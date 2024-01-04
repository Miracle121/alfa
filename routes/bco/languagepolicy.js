const express = require("express");
const { body } = require("express-validator");

const Languagepolicy = require("../../models/bco/languagepolicy");
const languagepolicy = require("../../controllers/bco/languagepolicy");

const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Languagepolicy),
  languagepolicy.getLanguagepolicy
);
router.get("/:id", languagepolicy.getLanguagepolicyById);

router.post("/", languagepolicy.createLanguagepolicy);
router.put("/:id", languagepolicy.updateLanguagepolicy);
router.delete("/:id", languagepolicy.deleteLanguagepolicy);

module.exports = router;
