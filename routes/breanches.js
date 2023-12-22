const express = require("express");
const { body } = require("express-validator");
const breanches = require("../controllers/breanches");
const Breanches = require("../models/breanches");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

const populateOptions = [
  { path: "regionId", select: "name" },
  { path: "breanchstatus", select: "name" },
  {
    path: "employees",
    populate: [{ path: "positions", select: "name" }],
  },
];

router.get(
  "/",
  advancedResults(Breanches, populateOptions),
  breanches.getBreanches
);

router.get("/:id", breanches.getBreanchesById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  breanches.createBreanches
);
router.put("/:id", breanches.updateBreanches);
router.delete("/:id", breanches.deleteBreanches);

module.exports = router;
