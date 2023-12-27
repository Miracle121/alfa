const express = require("express");
const clients = require("../../controllers/clients/clients");
const Clients = require("../../models/clients/clients");
const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

// Populate options
const populateOptions = [
  { path: "branch", select: "branchname" },
  { path: "typeofpersons", select: "name" },
  {
    path: "forindividualsdata",
  },
  {
    path: "corporateentitiesdata",
    populate: [
      { path: "region", select: "name" },
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
];

router.get("/", advancedResults(Clients, populateOptions), clients.getClients);
router.get("/:id", clients.getClientsById);

router.post("/", clients.createClients);
router.put("/:id", clients.updateClients);
router.delete("/:id", clients.deleteClients);
router.get("/f/inn", clients.getClientsByInn);

module.exports = router;
