const express = require("express");

const Bcoinpolicyblank = require("../../models/bco/bcoinpolicyblank");
const bcoinpolicyblank = require("../../controllers/bco/bcoinpolicyblank");

const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Bcoinpolicyblank),
  bcoinpolicyblank.getBcoinpolicyblank
);
router.get("/:id", bcoinpolicyblank.getBcoinpolicyblankById);

router.post("/", bcoinpolicyblank.createBcoinpolicyblank);
router.put("/:id", bcoinpolicyblank.updateBcoinpolicyblank);
router.delete("/:id", bcoinpolicyblank.deleteBcoinpolicyblank);

module.exports = router;
