const express = require("express");
const { body } = require("express-validator");
const subclasses = require("../controllers/subclasses");
const Subclasses = require("../models/subclasses");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Subclasses), subclasses.getSubClassesofproduct);
router.get("/:id", subclasses.getSubClassesofproductId);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  subclasses.createSubClassesofproduct
);
router.put("/:id", subclasses.updateSubClassesofproduct);
router.delete("/:id", subclasses.deleteSubClassesofproduct);

module.exports = router;
