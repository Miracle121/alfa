const express = require("express");
const { body } = require("express-validator");
const statusofproduct = require("../controllers/statusofproduct");
const Statusofproduct = require("../models/statusofproduct");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Statusofproduct),
  statusofproduct.getStatusOfProduct
);
router.get("/:id", statusofproduct.getStatusOfProductById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  statusofproduct.createStatusOfProduct
);
router.put("/:id", statusofproduct.updateStatusOfProduct);
router.delete("/:id", statusofproduct.deleteStatusOfProduct);

module.exports = router;
