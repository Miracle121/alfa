const express = require("express");
const { body } = require("express-validator");
const typeofpolice = require("../controllers/typeofpolice");
const Typeofpolice = require("../models/typeofpolice");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Typeofpolice), typeofpolice.getTypeofpolice);
router.get("/:id", typeofpolice.getTypeofpoliceId);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  typeofpolice.createTypeofpolice
);
router.put("/:id", typeofpolice.updateTypeofpolice);
router.delete("/:id", typeofpolice.deleteTypeofpolice);

module.exports = router;
