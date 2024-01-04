const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Groupsofproducts = require("../models/groupsofproducts");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getGroupsofProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advencedResults);
});

exports.getGroupsofProductsById = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;

  const groups = await findModelById(Groupsofproducts, groupsId);

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: groups,
  });
});

exports.createGroupsofProducts = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;

  const group = new Groupsofproducts({
    name,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `ma'lumotlar kiritildi`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateGroupsofProducts = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;
  const name = req.body.name;

  const groups = await findModelById(Groupsofproducts, groupsId);

  groups.name = name;

  const groupsofpr = await groups.save();
  res.status(200).json({
    message: `Groups data changed`,
    data: groupsofpr,
  });
});

exports.deleteGroupsofProducts = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;

  const deleteddata = await findModelById(Groupsofproducts, groupsId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Groupsofproducts.findByIdAndRemove(groupsId);

  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});
