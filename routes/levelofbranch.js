const express = require("express");
const { body } = require("express-validator");
const levelofbranch = require("../controllers/levelofbranch");
const Levelofbranch = require("../models/levelofbranch");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Levelofbranch), levelofbranch.getLevelofbranch);
router.get("/:id", levelofbranch.getLevelofbranchById);
router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  levelofbranch.createLevelofbranch
);
router.put("/:id", levelofbranch.updateLevelofbranch);
router.delete("/:id", levelofbranch.deleteLevelofbranch);

module.exports = router;
