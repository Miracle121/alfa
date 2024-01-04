const asyncHandler = require("express-async-handler");
const Policyformats = require("../models/policyformats");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getPolicyformats = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getPolicyformatsId = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const policyformats = await findModelById(Policyformats, subgroupsId);

  res.status(200).json({
    message: `Policy formats of products`,
    data: policyformats,
  });
});

exports.createPolicyformats = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;

  const group = new Policyformats({
    name: name,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `Policy formats add`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updatePolicyformats = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;
  const name = req.body.name;

  const groups = await findModelById(Policyformats, groupsId);

  groups.name = name;

  const groupsofpr = await groups.save();

  res.status(200).json({
    message: `Policy formats of products changed`,
    data: groupsofpr,
  });
});

exports.deletePolicyformats = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const deleteddata = await findmodelById(Policyformats, subgroupsId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("Bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Policyformats.findByIdAndRemove(subgroupsId);

  res.status(200).json({
    message: "Policy formats of products",
    data: data,
  });
});
