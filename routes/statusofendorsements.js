const express = require("express");
const statusofendorsements = require("../controllers/statusofendorsements");
const Statusofendorsements = require("../models/statusofendorsements");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Statusofendorsements),
  statusofendorsements.getStatusofendorsements
);
router.get("/:id", statusofendorsements.getStatusofendorsementsById);

router.post("/", statusofendorsements.createStatusofendorsements);
router.put("/:id", statusofendorsements.updateStatusofendorsements);
router.delete("/:id", statusofendorsements.deleteStatusofendorsements);

module.exports = router;
