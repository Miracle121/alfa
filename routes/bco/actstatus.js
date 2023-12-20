const express = require("express");

const Actstatus = require("../../models/bco/actstatus");
const actstatus = require("../../controllers/bco/actstatus");

const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Actstatus), actstatus.getActstatus);
router.get("/:id", actstatus.getActstatusById);

router.post("/", actstatus.createActstatus);
router.put("/:id", actstatus.updateActstatus);
router.delete("/:id", actstatus.deleteActstatus);

module.exports = router;
