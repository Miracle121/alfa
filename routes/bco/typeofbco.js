const express = require("express");

const Typeofbco = require("../../models/bco/typeofbco");
const typeofbco = require("../../controllers/bco/typeofbco");

const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

const poplate = [
  { path: "policy_size_id", select: "name" },
  { path: "language", select: "name" },
  { path: "statusofpolicy", select: "name" },
];

router.get("/", advancedResults(Typeofbco, poplate), typeofbco.getTypeofbco);
router.get("/:id", typeofbco.getTypeofbcoById);

router.post("/", typeofbco.createTypeofbco);
router.put("/:id", typeofbco.updateTypeofbco);
router.delete("/:id", typeofbco.deleteTypeofbco);

module.exports = router;
