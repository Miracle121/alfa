const express = require("express");
const { body } = require("express-validator");
const agents = require("../controllers/agents");
const Agents = require("../models/agents");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

const populateOptions = [
  { path: "branch", select: "branchname" },
  { path: "typeofpersons", select: "name" },
  { path: "typeofagent", select: "name" },
  {
    path: "forindividualsdata",
    populate: [
      { path: "gender", select: "name" },
      { path: "citizenship", select: "name" },
      { path: "typeofdocument", select: "name" },
      { path: "regions", select: "name" },
      { path: "districts", select: "name" },
    ],
  },
  {
    path: "corporateentitiesdata",
    populate: [
      { path: "regionId", select: "name" },
      { path: "districts", select: "name" },
      {
        path: "employees",
        populate: [
          { path: "positions", select: "name" },
          { path: "typeofdocumentsformanager", select: "name" },
        ],
      },
    ],
  },
  {
    path: "user_id",
    select: "email branch_Id accountstatus accountrole",
    populate: [
      { path: "branch_Id", select: "branchname" },
      { path: "accountstatus", select: "name" },
      { path: "accountrole", select: "name" },
    ],
  },
];

router.get("/", advancedResults(Agents, populateOptions), agents.getAgents);
router.get("/:id", agents.getAgentsById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  agents.createAgents
);
router.put("/:id", agents.updateAgents);
router.delete("/:id", agents.deleteAgents);
router.get("/f/:id", agents.getAgentsByBranchId);

module.exports = router;
