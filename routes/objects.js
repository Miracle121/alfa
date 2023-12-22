const express = require("express");
const { body } = require("express-validator");
const objects = require("../controllers/objects");
const Objects = require("../models/objects");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Objects), objects.getObject);
router.get("/:id", objects.getObjectId);
router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  objects.createObject
);
router.put("/:id", objects.updateObject);
router.delete("/:id", objects.deleteObject);

module.exports = router;
