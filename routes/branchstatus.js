const express = require("express");
const { body } = require("express-validator");
const breanchstatus = require("../controllers/branchstatus");
const Breanchstatus = require("../models/branchstatus");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Breanchstatus), breanchstatus.getbreanchstatus);
router.get("/:id", breanchstatus.getbreanchstatusById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  breanchstatus.createbreanchstatus
);
router.put("/:id", breanchstatus.updatebreanchstatus);
router.delete("/:id", breanchstatus.deletebreanchstatus);

module.exports = router;
