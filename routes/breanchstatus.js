const express = require("express");
const { body } = require("express-validator");
const breanchstatus = require("../controllers/breanchstatus");
const Breanchstatus = require("../models/breanchstatus");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Breanchstatus), breanchstatus.getBreanchstatus);
router.get("/:id", breanchstatus.getBreanchstatusById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  breanchstatus.createBreanchstatus
);
router.put("/:id", breanchstatus.updateBreanchstatus);
router.delete("/:id", breanchstatus.deleteBreanchstatus);

module.exports = router;
