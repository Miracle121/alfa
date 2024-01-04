const express = require("express");
const { body } = require("express-validator");
const typeofrisks = require("../controllers/typeofrisks");
const Typeofrisks = require("../models/typeofrisks");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Typeofrisks), typeofrisks.getTypeofrisks);
router.get("/:id", typeofrisks.getTypeofrisksId);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  typeofrisks.createTypeofrisks
);
router.put("/:id", typeofrisks.updateTypeofrisks);
router.delete("/:id", typeofrisks.deleteTypeofrisks);

module.exports = router;
