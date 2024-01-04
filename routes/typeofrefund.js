const express = require("express");
const { body } = require("express-validator");
const typeofrefund = require("../controllers/typeofrefund");
const Typeofrefund = require("../models/typeofrefund");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Typeofrefund), typeofrefund.getTypeofrefund);
router.get("/:id", typeofrefund.getTypeofrefundById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  typeofrefund.createTypeofrefund
);
router.put("/:id", typeofrefund.updateTypeofrefund);
router.delete("/:id", typeofrefund.deleteTypeofrefund);

module.exports = router;
