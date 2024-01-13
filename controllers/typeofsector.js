const asyncHandler = require("express-async-handler");
const Typeofsector = require("../models/typeofsector");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getTypeofsector = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTypeofsectorId = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;
  const policyformats = await findModelById(Typeofsector, subgroupsId);

  res.status(200).json({
    message: `Type of sector`,
    data: policyformats,
  });
});

exports.createTypeofsector = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;

  const group = new Typeofsector({
    name: name,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `Type of sector added`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateTypeofsector = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;
  const name = req.body.name;

  const groups = await findModelById(Typeofsector, groupsId);

  groups.name = name;

  const groupsofpr = await groups.save();

  res.status(200).json({
    message: `Type of sector changed`,
    data: groupsofpr,
  });
});

exports.deleteTypeofsector = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;
  const deleteddata = await findModelById(Typeofsector, subgroupsId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Typeofsector.findByIdAndDelete(subgroupsId);
  res.status(200).json({
    message: "Type of sector",
    data: data,
  });
});
