const express = require("express");
const agreements = require("../controllers/agreements");
const Agreements = require("../models/agreements");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

// populate options
const populateOptions = [
  { path: "branch", select: "inn" },
  { path: "groupofproductsId", select: "name" },
  { path: "subgroupofproductsId", select: "name" },
  { path: "products", select: "productname" },
  { path: "clinets", select: "inn" },
  { path: "beneficiary", select: "inn" },
  { path: "pledgers", select: "inn" },
  { path: "objectofinsurance.typeofobjects", select: "name" },
  { path: "objectofinsurance.objects", select: "name" },
  { path: "objectofinsurance.region", select: "name" },
  { path: "objectofinsurance.districtsId", select: "name" },
  { path: "riskId.riskgroup", select: "name" },
  { path: "riskId.risk", select: "name" },
  { path: "riskId.classeId", select: "name" },
  { path: "paymentcurrency", select: "name" },
  { path: "franchise.risk", select: "name" },
  { path: "franchise.typeoffranchise", select: "name" },
  { path: "franchise.baseoffranchise", select: "name" },
  { path: "termination.reason", select: "name" },
  { path: "commission.agents", select: "inn" },
  {
    path: "policy",
    populate: [
      { path: "branch_id", select: "inn" },
      { path: "policy_blanknumber", select: "blank_number" },
    ],
  },
];

const populates = [
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

router.get(
  "/",
  advancedResults(Agreements, populateOptions),
  agreements.getAgreements
);
router.get("/:id", agreements.getAgreementsById);

router.post("/", agreements.createAgreements);
router.put("/:id", agreements.updateAgreements);
router.delete("/:id", agreements.deleteAgreements);

module.exports = router;
