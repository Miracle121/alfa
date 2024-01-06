const express = require("express");
const translations = require("../controllers/translations");
const Translations = require("../models/translations");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.get("/", advancedResults(Translations), translations.getTranslations);
router.get("/:id", translations.getTranslationsId);

router.post("/", IsAuth, translations.createTranslations);
router.put("/:id", IsAuth, translations.updateTranslations);
router.delete("/:id", IsAuth, translations.deleteTranslations);
router.get("/lang/:id", translations.getByLanguages);

module.exports = router;
