const express = require("express");
const { body } = require("express-validator");
const typeofagent = require("../controllers/typeofagent");
const Typeofagent = require("../models/typeofagent");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Typeofagent), typeofagent.getTypeofagent);
router.get("/:id", typeofagent.getTypeofagentById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  typeofagent.createTypeofagent
);
router.put("/:id", typeofagent.updateTypeofagent);
router.delete("/:id", typeofagent.deleteTypeofagent);

module.exports = router;
