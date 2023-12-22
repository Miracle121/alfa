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
  const name = req.body.name;
  const typobjectsId = req.body.typobjectsId;
  const group = new Objects({
    name: name,
    typobjectsId: typobjectsId,
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

  const groups = await findModelById(Objects, typeofobjectId);

  groups.name = name;
  groups.typobjectsId = typobjectsId;

  const typeofrisk = await groups.save();

  res.status(200).json({
    message: `Objects is changed`,
    data: typeofrisk,
  });
});

exports.deleteObject = asyncHandler(async (req, res, next) => {
  const objectsId = req.params.id;

  const deleteddata = await findModelById(Objects, objectsId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Objects.findByIdAndRemove(objectsId);

  res.status(200).json({
    message: "Risks is deleted",
    data: data,
  });
});
