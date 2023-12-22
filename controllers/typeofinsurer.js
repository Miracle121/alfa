const asyncHandler = require("express-async-handler");
const Typeofinsurer = require("../models/typeofinsurer");
const { validationResult } = require("express-validator");
const { ErrorResponse } = require("../util/errorResponse");

exports.getTypeOfInsurer = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTypeOfInsurerById = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const groups = await findModelById(Typeofinsurer, subgroupsId);

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: groups,
  });
});

exports.createTypeOfInsurer = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;
  const groupId = req.body.groupId;

  const group = new Typeofinsurer({
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

exports.updateTypeOfInsurer = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;
  const name = req.body.name;
  const groupId = req.body.groupId;

  const groups = await Typeofinsurer.findById(groupsId);
  if (!groups) {
    const error = new Error("Object  not found");
    error.statusCode = 404;
    throw error;
  }
  groups.name = name;
  groups.groupsId = groupId;
  const groupsofpr = await groups.save();
  res.status(200).json({
    message: `Sub-Groups data changed`,
    data: groupsofpr,
  });
});

exports.deleteTypeOfInsurer = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const deleteddata = await findModelById(Typeofinsurer, subgroupsId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Typeofinsurer.findByIdAndRemove(subgroupsId);
  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});
