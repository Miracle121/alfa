const asyncHandler = require("express-async-handler");
const Reasons = require("../models/reasons");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getReasons = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getReasonsId = asyncHandler(async (req, res, next) => {
  const objectId = req.params.id;

  const objects = await findModelById(Reasons, objectId);

  res.status(200).json({
    message: `Reasons list`,
    data: objects,
  });
});

exports.createReasons = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }
  console.log(req.user);
  const name = req.body.name;

  const group = new Reasons({
    name: name,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `Reasons added`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateReasons = asyncHandler(async (req, res, next) => {
  const typeofobjectId = req.params.id;
  const name = req.body.name;

  const groups = await findModelById(Reasons, typeofobjectId);

  groups.name = name;

  const typeofrisk = await groups.save();

  res.status(200).json({
    message: `Reasons is changed`,
    data: typeofrisk,
  });
});

exports.deleteReasons = asyncHandler(async (req, res, next) => {
  const objectsId = req.params.id;

  const deleteddata = await findModelById(Reasons, objectsId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Reasons.findByIdAndRemove(objectsId);

  res.status(200).json({
    message: "Reasons is deleted",
    data: data,
  });
});
