const express = require("express");
const { body } = require("express-validator");
const translations = require("../controllers/translations");
const Translations = require("../models/translations");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Translations), translations.getTranslations);
router.get("/:id", translations.getTranslationsId);

router.post("/", translations.createTranslations);
router.put("/:id", translations.updateTranslations);
router.delete("/:id", translations.deleteTranslations);
router.get("/lang/:id", translations.getByLanguages);

module.exports = router;
