const express = require("express");
const { body } = require("express-validator");
const typeofdocuments = require("../controllers/typeofdocuments");
const Typeofdocuments = require("../models/typeofdocuments");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Typeofdocuments),
  typeofdocuments.getTypeofdocuments
);
router.get("/:id", typeofdocuments.getTypeofdocumentsById);
router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  typeofdocuments.createTypeofdocuments
);
router.put("/:id", typeofdocuments.updateTypeofdocuments);
router.delete("/:id", typeofdocuments.deleteTypeofdocuments);

module.exports = router;
