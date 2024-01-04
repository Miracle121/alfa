const express = require("express");
const { body } = require("express-validator");
const typeofobject = require("../controllers/typeofobject");
const Typeofobject = require("../models/typeofobject");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Typeofobject), typeofobject.getTypeofobject);
router.get("/:id", typeofobject.getTypeofobjectId);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  typeofobject.createTypeofobject
);
router.put("/:id", typeofobject.updateTypeofobject);
router.delete("/:id", typeofobject.deleteTypeofobject);

module.exports = router;
