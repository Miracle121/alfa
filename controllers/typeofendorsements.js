const asyncHandler = require("express-async-handler");
const Typeofendorsements = require("../models/typeofendorsements");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getTypeofendorsements = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTypeofendorsementsById = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const groups = await findModelById(Typeofendorsements, subgroupsId);

  res.status(200).json({
    message: `Typeofendorsements list`,
    data: groups,
  });
});

exports.createTypeOfendorsements = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;

  const group = new Typeofendorsements({
    name: name,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `Typeofendorsements list`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateTypeofendorsements = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;
  const name = req.body.name;

  const groups = await findModelById(Typeofendorsements, groupsId);

  groups.name = name;

  const groupsofpr = await groups.save();
  res.status(200).json({
    message: `Typeofendorsements list`,
    data: groupsofpr,
  });
});

exports.deleteTypeOfendorsements = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const deleteddata = await findModelById(Typeofendorsements, subgroupsId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Typeofendorsements.findByIdAndDelete(subgroupsId);

  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});
