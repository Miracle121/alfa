const express = require("express");
const { body } = require("express-validator");
const mfy = require("../controllers/mfy");
const Mfy = require("../models/mfy");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Mfy, [
    { path: "district", select: "name" },
    { path: "region", select: "name" },
  ]),
  mfy.getMfy
);
router.get("/:id", mfy.getMfyById);

router.post("/", [body("name").trim().isLength({ min: 3 })], mfy.createMfy);
router.put("/:id", mfy.updateMfy);
router.delete("/:id", mfy.deleteMfy);

module.exports = router;
