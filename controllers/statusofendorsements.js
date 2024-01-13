const asyncHandler = require("express-async-handler");
const Statusofendorsements = require("../models/statusofendorsements");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getStatusofendorsements = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getStatusofendorsementsById = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const groups = await findModelById(Statusofendorsements, subgroupsId);

  res.status(200).json({
    message: `Statusofendorsements list`,
    data: groups,
  });
});

exports.createStatusofendorsements = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;

  const group = new Statusofendorsements({
    name: name,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `Statusofendorsements list`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateStatusofendorsements = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;
  const name = req.body.name;

  const groups = await findModelById(Statusofendorsements, groupsId);

  groups.name = name;

  const groupsofpr = await groups.save();

  res.status(200).json({
    message: `Statusofendorsements list`,
    data: groupsofpr,
  });
});

exports.deleteStatusofendorsements = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const deleteddata = await findModelById(Statusofendorsements, subgroupsId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Statusofendorsements.findByIdAndDelete(subgroupsId);

  res.status(200).json({
    message: "Statusofendorsements is deletes",
    data: data,
  });
});
