const express = require("express");
const { body } = require("express-validator");
const roles = require("../controllers/role");
const Roles = require("../models/role");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

router.get("/", advancedResults(Roles), roles.getRole);
router.get("/:id", roles.getRoleId);

router.post("/", [body("name").trim().isLength({ min: 3 })], roles.createRole);
router.put("/:id", roles.updateRole);
router.delete("/:id", roles.deleteRole);

module.exports = router;
