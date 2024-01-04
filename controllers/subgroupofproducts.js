const asyncHandler = require("express-async-handler");
const Subgroupofproducts = require("../models/subgroupofproducts");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getSubgroupOfProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getSubgroupOfProductsById = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const groups = await findModelById(Subgroupofproducts, subgroupsId);

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: groups,
  });
});

exports.createSubgroupOfProducts = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;
  const groupId = req.body.groupId;

  const group = new Subgroupofproducts({
    name: name,
    groupId: groupId,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `ma'lumotlar kiritildi`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateSubgroupOfProducts = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;
  const name = req.body.name;
  const groupId = req.body.groupId;

  const groups = await findModelById(Subgroupofproducts, groupsId);

  groups.name = name;
  groups.groupsId = groupId;

  const groupsofpr = await groups.save();

  res.status(200).json({
    message: `Sub-Groups data changed`,
    data: groupsofpr,
  });
});

exports.deleteSubgroupOfProducts = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const deleteddata = await findModelById(Subgroupofproducts, subgroupsId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Subgroupofproducts.findByIdAndRemove(subgroupsId);

  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});
