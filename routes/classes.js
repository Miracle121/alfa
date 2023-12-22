const express = require("express");
const { body } = require("express-validator");
const classesofproduct = require("../controllers/classes");
const Classesofproduct = require("../models/classes");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Classesofproduct),
  classesofproduct.getClassesofproduct
);
router.get("/:id", classesofproduct.getClassesofproductId);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  classesofproduct.createClassesofproduct
);
router.put("/:id", classesofproduct.updateClassesofproduct);
router.delete("/:id", classesofproduct.deleteClassesofproduct);

module.exports = router;
