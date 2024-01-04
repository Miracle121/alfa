const express = require("express");

const Bco = require("../../models/bco/bco");
const bco = require("../../controllers/bco/bco");

const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

const populate = [
  { path: "policy_type_id", select: "policy_type_name" },
  { path: "act_id", select: "act_number" },
];

router.get("/", advancedResults(Bco, populate), bco.getBco);
router.get("/:id", bco.getBcoById);

router.post("/", bco.createBco);
router.put("/:id", bco.updateBco);
router.delete("/:id", bco.deleteBco);

module.exports = router;
