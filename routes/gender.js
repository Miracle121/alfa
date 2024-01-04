const express = require("express");
const { body } = require("express-validator");
const genders = require("../controllers/gender");
const Genders = require("../models/gender");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Genders), genders.getGenders);
router.get("/:id", genders.getGendersById);
router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  genders.createGenders
);
router.put("/:id", genders.updateGenders);
router.delete("/:id", genders.deleteGenders);

module.exports = router;
