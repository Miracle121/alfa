const express = require("express");
const { body } = require("express-validator");
const typeofpersons = require("../controllers/typeofpersons");
const Typeofpersons = require("../models/typeofpersons");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Typeofpersons), typeofpersons.getTypeofpersons);
router.get("/:id", typeofpersons.getTypeofpersonsById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  typeofpersons.createTypeofpersons
);
router.put("/:id", typeofpersons.updateTypeofpersons);
router.delete("/:id", typeofpersons.deleteTypeofpersons);

module.exports = router;
