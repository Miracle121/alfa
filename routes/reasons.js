const express = require("express");
const { body } = require("express-validator");
const reasons = require("../controllers/reasons");
const Reasons = require("../models/reasons");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Reasons), reasons.getReasons);
router.get("/:id", reasons.getReasonsId);
router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  reasons.createReasons
);
router.put("/:id", reasons.updateReasons);
router.delete("/:id", reasons.deleteReasons);

module.exports = router;
