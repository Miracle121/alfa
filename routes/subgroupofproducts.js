const express = require("express");
const { body } = require("express-validator");
const groupsofproducts = require("../controllers/subgroupofproducts");
const Groupsofproducts = require("../models/subgroupofproducts");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Groupsofproducts),
  groupsofproducts.getSubgroupOfProducts
);
router.get("/:id", groupsofproducts.getSubgroupOfProductsById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  groupsofproducts.createSubgroupOfProducts
);
router.put("/:id", groupsofproducts.updateSubgroupOfProducts);
router.delete("/:id", groupsofproducts.deleteSubgroupOfProducts);

module.exports = router;
