const express = require("express");
const endorsements = require("../controllers/endorsements");
const Endorsements = require("../models/endorsements");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

const populateOptions = [
  { path: "agreementsId", select: "agreementsnumber" },
  { path: "typeofendorsements", select: "name" },
  { path: "statusofendorsements", select: "name" },
];

router.get(
  "/",
  advancedResults(Endorsements, populateOptions),
  endorsements.getEndorsements
);
router.get("/:id", endorsements.getEndorsementsById);

router.post("/", endorsements.createEndorsements);
router.put("/:id", endorsements.updateEndorsements);
router.delete("/:id", endorsements.deleteEndorsements);
router.get("/f/:id", endorsements.getEndorsementsByAgreementId);

module.exports = router;
