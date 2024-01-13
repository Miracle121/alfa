const asyncHandler = require("express-async-handler");
const Typeofpolice = require("../models/typeofpolice");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getTypeofpolice = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTypeofpoliceId = asyncHandler(async (req, res, next) => {
  const typeofpoliceId = req.params.id;

  const typeofpolice = await findModelById(Typeofpolice, typeofpoliceId);

  res.status(200).json({
    message: `List of police`,
    data: typeofpolice,
  });
});

exports.createTypeofpolice = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;
  const group = new Typeofpolice({
    name: name,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `Police added`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateTypeofpolice = asyncHandler(async (req, res, next) => {
  const typeofriskId = req.params.id;
  const name = req.body.name;

  const groups = await findModelById(Typeofpolice, typeofriskId);

  groups.name = name;
  const typeofrisk = await groups.save();
  res.status(200).json({
    message: `Police added`,
    data: typeofrisk,
  });
});

exports.deleteTypeofpolice = asyncHandler(async (req, res, next) => {
  const typeofrisksId = req.params.id;

  const deleteddata = await findModelById(Typeofpolice, typeofrisksId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Typeofpolice.findByIdAndDelete(typeofrisksId);
  res.status(200).json({
    message: "Risks is deleted",
    data: data,
  });
});
