const express = require("express");

const Acts = require("../../models/bco/acts");
const acts = require("../../controllers/bco/acts");

const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

// Populate path
const populate = [
  { path: "senderBranch", select: "branchname" },
  // { path: 'senderEmployee', select: 'name' },
  { path: "receiverBranch", select: "branchname" },
  // { path: 'receiverEmployee', select: 'email' },
  { path: "statusOfAct", select: "name" },
];

router.get("/", advancedResults(Acts, populate), acts.getActs);
router.get("/:id", acts.getActsById);

router.post("/", acts.createActs);
router.put("/:id", acts.updateActs);
router.delete("/:id", acts.deleteActs);
router.post("/f/cheakblank", acts.checkBlanks);

module.exports = router;
