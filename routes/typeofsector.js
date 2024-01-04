const express = require("express");
const { body } = require("express-validator");
const typeofsector = require("../controllers/typeofsector");
const Typeofsector = require("../models/typeofsector");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Typeofsector), typeofsector.getTypeofsector);
router.get("/:id", typeofsector.getTypeofsectorId);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  typeofsector.createTypeofsector
);
router.put("/:id", typeofsector.updateTypeofsector);
router.delete("/:id", typeofsector.deleteTypeofsector);

module.exports = router;
