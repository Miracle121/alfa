const express = require("express");
const { body } = require("express-validator");
const citizenship = require("../controllers/citizenship");
const Citizenship = require("../models/citizenship");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Citizenship), citizenship.getCitizenship);
router.get("/:id", citizenship.getCitizenshipById);
router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  citizenship.createCitizenship
);
router.put("/:id", citizenship.updateCitizenship);
router.delete("/:id", citizenship.deleteCitizenship);

module.exports = router;
