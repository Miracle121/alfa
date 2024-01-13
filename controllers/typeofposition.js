const asyncHandler = require("express-async-handler");
const Typeofposition = require("../models/typeofposition");
const { validationResult } = require("express-validator");
const { ErrorResponse } = require("../util/errorResponse");

exports.getTypeofposition = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTypeofpositionId = asyncHandler(async (req, res, next) => {
  const classesId = req.params.id;

  const data = await findModelById(Typeofposition, classesId);

  res.status(200).json({
    message: `Typeofposition of products`,
    data: data,
  });
});

exports.createTypeofposition = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;

  const group = new Typeofposition({
    name: name,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `Typeofposition of products`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateTypeofposition = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;
  const name = req.body.name;

  const groups = await findModelById(Typeofposition, groupsId);

  groups.name = name;

  const classesofproduct = await groups.save();
  res.status(200).json({
    message: `Typeofposition of products`,
    data: classesofproduct,
  });
});

exports.deleteTypeofposition = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const deleteddata = await Typeofposition.findById(subgroupsId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Typeofposition.findByIdAndDelete(subgroupsId);
  res.status(200).json({
    message: "Classe of products",
    data: data,
  });
});
