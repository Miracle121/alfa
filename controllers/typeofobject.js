const asyncHandler = require("express-async-handler");
const Typeofobject = require("../models/typeofobject");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getTypeofobject = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTypeofobjectId = asyncHandler(async (req, res, next) => {
  const typeofobkectsId = req.params.id;

  const typeofobject = await findModelById(Typeofobject, typeofobkectsId);

  res.status(200).json({
    message: `Type of objects`,
    data: typeofobject,
  });
});

exports.createTypeofobject = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;
  const group = new Typeofobject({
    name: name,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `Police added`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateTypeofobject = asyncHandler(async (req, res, next) => {
  const typeofobjectId = req.params.id;
  const name = req.body.name;

  const groups = await findModelById(Typeofobject, typeofobjectId);

  groups.name = name;

  const typeofrisk = await groups.save();

  res.status(200).json({
    message: `Police added`,
    data: typeofrisk,
  });
});

exports.deleteTypeofobject = asyncHandler(async (req, res, next) => {
  const typeofobjectsId = req.params.id;

  const deleteddata = await findModelById(Typeofobject, typeofobjectsId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Typeofobject.findByIdAndRemove(typeofobjectsId);

  res.status(200).json({
    message: "Risks is deleted",
    data: data,
  });
});
