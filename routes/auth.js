const express = require("express");
const auth = require("../controllers/auth");

const router = express.Router();

router.post("/sinup", auth.signupUsers);

router.post("/login", auth.login);

module.exports = router;
