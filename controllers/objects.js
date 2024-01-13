const asyncHandler = require("express-async-handler");
const Objects = require("../models/objects");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getObject = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getObjectId = asyncHandler(async (req, res, next) => {
  const objectId = req.params.id;

  const objects = await findModelById(Objects, objectId);

  res.status(200).json({
    message: `Objects list`,
    data: objects,
  });
});

exports.createObject = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const { typobjectsId, name, details } = req.body;

  const group = new Objects({
    typobjectsId,
    name,
    details,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `Objects added`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateObject = asyncHandler(async (req, res, next) => {
  const typeofobjectId = req.params.id;
  const name = req.body.name;
  const typobjectsId = req.body.typobjectsId;
  const details = req.body.details;

  const groups = await findModelById(Objects, typeofobjectId);

  if (groups.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  groups.name = name;
  groups.typobjectsId = typobjectsId;
  groups.details = { ...groups.details, details };

  await groups.save();

  res.status(200).json({
    message: `Objects is changed`,
    data: groups,
  });
});

exports.deleteObject = asyncHandler(async (req, res, next) => {
  const objectsId = req.params.id;

  const deleteddata = await findModelById(Objects, objectsId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Objects.findByIdAndDelete(objectsId);

  res.status(200).json({
    message: "Risks is deleted",
    data: data,
  });
});
