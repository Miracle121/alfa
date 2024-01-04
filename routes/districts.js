const express = require("express");
const { body } = require("express-validator");
const districts = require("../controllers/districts");
const District = require("../models/districts");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(District, { path: "region", select: "name" }),
  districts.getDistricts
);
router.get("/:id", districts.getDistrictsById);
router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  districts.createDistricts
);
router.put("/:id", districts.updateDistricts);
router.delete("/:id", districts.deleteDistricts);

module.exports = router;
