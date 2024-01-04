const express = require("express");
const { body } = require("express-validator");
const groupsofproducts = require("../controllers/groupsofproducts");
const Groupsofproducts = require("../models/groupsofproducts");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get(
  "/",
  advancedResults(Groupsofproducts),
  groupsofproducts.getGroupsofProducts
);
router.get("/:id", groupsofproducts.getGroupsofProductsById);

router.post(
  "/",
  [body("name").trim().isLength({ min: 3 })],
  groupsofproducts.createGroupsofProducts
);
router.put("/:id", groupsofproducts.updateGroupsofProducts);
router.delete("/:id", groupsofproducts.deleteGroupsofProducts);

module.exports = router;
