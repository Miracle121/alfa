const express = require("express");
const additionaldocuments = require("../controllers/additionaldocuments");
const Additionaldocuments = require("../models/additionaldocuments");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Additionaldocuments),
  additionaldocuments.getadditionaldocuments
);
router.get("/:id", additionaldocuments.getAdditionaldocumentsById);

router.post("/", additionaldocuments.createAdditionaldocuments);
router.put("/:id", additionaldocuments.updateAdditionaldocuments);
router.delete("/:id", additionaldocuments.deleteAdditionaldocuments);

// router.post('/',additionaldocuments.upload)
router.get("/files/:name", additionaldocuments.download);

module.exports = router;
