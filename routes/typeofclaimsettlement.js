const express = require("express");
const { body } = require("express-validator");
const typeofclaimsettlement = require("../controllers/typeofclaimsettlement");
const Typeofclaimsettlement = require("../models/typeofclaimsettlement");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Typeofclaimsettlement),
  typeofclaimsettlement.getTypeofclaimsettlement
);
router.get("/:id", typeofclaimsettlement.getTypeofclaimsettlementById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  typeofclaimsettlement.createTypeofclaimsettlement
);
router.put("/:id", typeofclaimsettlement.updateTypeofclaimsettlement);
router.delete("/:id", typeofclaimsettlement.deleteTypeofclaimsettlement);

module.exports = router;
