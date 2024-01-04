const express = require("express");
const employee = require("../../controllers/employee/employee");
const Employee = require("../../models/employee/employee");

const IsAuth = require("../../middleware/is-auth");
const uploadimages = require("../../middleware/uploadimages");
const { advancedResults } = require("../../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

// Populate options
const populateOptions = [
  { path: "branch", select: "branchname" },
  { path: "gender", select: "name" },
  { path: "citizenship", select: "name" },
  { path: "regions", select: "name" },
  { path: "districts", select: "name" },
  { path: "position", select: "name" },
  {
    path: "user_id",
    select: "email branch_Id accountstatus accountrole ",
    populate: [
      { path: "branch_Id", select: "branchname" },
      { path: "accountstatus", select: "name" },
      { path: "accountrole", select: "name" },
    ],
  },
];

router.get(
  "/",
  advancedResults(Employee, populateOptions),
  employee.getEmployees
);
router.get("/:id", employee.getEmployeesById);

router.post("/", uploadimages.single("files"), employee.createEmployees);
router.put("/:id", uploadimages.single("files"), employee.uploadPhoto);
router.put("/:id", employee.updateEmployees);
router.delete("/:id", employee.deleteEmployeess);

module.exports = router;
