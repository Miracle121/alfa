const express = require("express");
const { body } = require("express-validator");
const User = require("../models/users");
const users = require("../controllers/users");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

const populateOptions = [
  { path: "accountstatus", select: "name" },
  { path: "accountrole", select: "name" },
  { path: "branch_Id", select: "branchname" },
  { path: "agent_Id", select: "inn" },
];

router.get("/", advancedResults(User, populateOptions), users.getUsers);
router.get("/:id", users.getUsersById);
router.post(
  "/",
  [
    body("email")
      .isEmail()
      .withMessage("iltimos email adress kiriting")
      .custom(async (value, { req }) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject("E-mail bor");
        }
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  users.CreateUsers
);
router.put("/:id", users.UpdateUsers);
router.delete("/:id", users.DeleteUsers);
router.get("/f/getme", users.getMe);

module.exports = router;
