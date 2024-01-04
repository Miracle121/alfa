const express = require("express");
const { body } = require("express-validator");
const applicationformdocs = require("../controllers/applicationformdocs");
const Applicationformdocs = require("../models/applicationformdocs");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Applicationformdocs),
  applicationformdocs.getApplicationformdocs
);
router.get("/:id", applicationformdocs.getApplicationformdocsById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  applicationformdocs.createApplicationformdocs
);
router.put("/:id", applicationformdocs.updateApplicationformdocs);
router.delete("/:id", applicationformdocs.deleteApplicationformdocs);

module.exports = router;
