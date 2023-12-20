const express = require("express");

const Warehouse = require("../../models/bco/warehouse");
const warehouse = require("../../controllers/bco/warehouse");

const IsAuth = require("../../middleware/is-auth");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

const poplate = [
  { path: "statusofpolicy", select: "name" },
  { path: "branch_id", select: "branchname" },
  {
    path: "policy_type_id",
    populate: [
      { path: "policy_size_id", select: "name" },
      { path: "language", select: "name" },
    ],
  },
];

router.get("/", advancedResults(Warehouse, poplate), warehouse.getWarehouse);
router.get("/:id", warehouse.getWarehouseById);

router.post("/", warehouse.createWarehouse);
router.put("/:id", warehouse.updateWarehouse);
router.delete("/:id", warehouse.deleteWarehouse);
router.get("/f/:id", warehouse.getPolicyblanknumberByTypeId);

module.exports = router;
