const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const User = require("../models/users");
const { ErrorResponse } = require("../util/errorResponse");

exports.signupUsers = asyncHandler(async (req, res, next) => {
  // Validate request parameters
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    error.data = errors.array();
    throw error;
  }

  // Extract user input
  const { name, middlename, email, password } = req.body;

  // Check email exsist
  const checkEmail = await User.findOne({ email });
  if (checkEmail) throw new ErrorResponse("Email already exsist", 400);

  // Create a new user
  const user = await User.create({
    name,
    middlename,
    email,
    password,
  });

  res.status(201).json({
    message: "User successfully registered",
    data: user,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ErrorResponse("Please provide an email and password", 400);

  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new ErrorResponse("Invalid credebtials", 404);

  const isMatch = await user.matchPassword(password);

  if (!isMatch) throw new ErrorResponse("Invalid credebtials", 401);

  const token = user.getSignedJwtToken();

  res.status(200).json({
    token,
    userId: user._id.toString(),
    accountrole: user.accountrole,
  });
});
