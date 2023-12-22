const asyncHandler = require("express-async-handler");
const Typeofrisks = require("../models/typeofrisks");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getTypeofrisks = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTypeofrisksId = asyncHandler(async (req, res, next) => {
  const riskId = req.params.id;

  const typeofrisk = await findModelById(Typeofrisks, riskId);

  res.status(200).json({
    message: `Type of risks list`,
    data: typeofrisk,
  });
});

exports.createTypeofrisks = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;
  const group = new Typeofrisks({
    name: name,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `Type of risks list`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateTypeofrisks = asyncHandler(async (req, res, next) => {
  const typeofriskId = req.params.id;
  const name = req.body.name;

  const groups = await findModelById(Typeofrisks, typeofriskId);

  groups.name = name;

  const typeofrisk = await groups.save();

  res.status(200).json({
    message: `Type of risks list`,
    data: typeofrisk,
  });
});

exports.deleteTypeofrisks = asyncHandler(async (req, res, next) => {
  const typeofrisksId = req.params.id;

  const deleteddata = await findModelById(Typeofrisks, typeofrisksId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Typeofrisks.findByIdAndRemove(typeofrisksId);

  res.status(200).json({
    message: "Type of risks list",
    data: data,
  });
});
