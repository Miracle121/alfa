const express = require("express");

const Statusoftypebco = require("../../models/bco/statusoftypebco");
const statusoftypebco = require("../../controllers/bco/statusoftypebco");

const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();
router.use(IsAuth);

router.get(
  "/",
  advancedResults(Statusoftypebco),
  statusoftypebco.getStatusoftypebco
);
router.get("/:id", statusoftypebco.getStatusoftypebcoById);

router.post("/", statusoftypebco.createStatusoftypebco);
router.put("/:id", statusoftypebco.updateStatusoftypebco);
router.delete("/:id", statusoftypebco.deleteStatusoftypebco);

module.exports = router;
