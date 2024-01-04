const express = require("express");
const { body } = require("express-validator");
const typeofinsurer = require("../controllers/typeofinsurer");
const Typeofinsurer = require("../models/typeofinsurer");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Typeofinsurer), typeofinsurer.getTypeOfInsurer);
router.get("/:id", typeofinsurer.getTypeOfInsurerById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  typeofinsurer.createTypeOfInsurer
);
router.put("/:id", typeofinsurer.updateTypeOfInsurer);
router.delete("/:id", typeofinsurer.deleteTypeOfInsurer);

module.exports = router;
