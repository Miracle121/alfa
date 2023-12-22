const express = require("express");
const typeofdistribute = require("../../controllers/billing/typeofdistribute");
const Typeofdistribute = require("../../models/billing/typeofdistribute");
const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Typeofdistribute),
  typeofdistribute.getTypeofdistributes
);
router.get("/:id", typeofdistribute.getTypeofdistributesById);

router.post("/", typeofdistribute.createTypeofdistributes);
router.put("/:id", typeofdistribute.updateTypeofdistributes);
router.delete("/:id", typeofdistribute.deleteTypeofdistributes);

module.exports = router;
