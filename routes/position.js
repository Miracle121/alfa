const express = require("express");
const { body } = require("express-validator");
const position = require("../controllers/position");
const Position = require("../models/position");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Position), position.getPosition);
router.get("/:id", position.getPositionById);
router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  position.createPosition
);
router.put("/:id", position.updatePosition);
router.delete("/:id", position.deletePosition);

module.exports = router;
