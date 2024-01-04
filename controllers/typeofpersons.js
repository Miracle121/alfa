const asyncHandler = require("express-async-handler");
const Typeofpersons = require("../models/typeofpersons");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getTypeofpersons = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTypeofpersonsById = asyncHandler(async (req, res, next) => {
  const classesId = req.params.id;

  const classesofproduct = await findModelById(Typeofpersons, classesId);

  res.status(200).json({
    message: `Typeofpersons of products`,
    data: classesofproduct,
  });
});

exports.createTypeofpersons = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;

  const group = new Typeofpersons({
    name: name,
    creatorId: req.user._id,
  });
  const groups = await group.save();
  res.status(201).json({
    message: `Typeofpersons of products`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateTypeofpersons = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;
  const name = req.body.name;

  const groups = await findModelById(Typeofpersons, groupsId);

  groups.name = name;
  const classesofproduct = await groups.save();
  res.status(200).json({
    message: `Classe of products`,
    data: classesofproduct,
  });
});

exports.deleteTypeofpersons = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const deleteddata = await findModelById(Typeofpersons, subgroupsId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Typeofpersons.findByIdAndRemove(subgroupsId);
  res.status(200).json({
    message: "Typeofpersons of products",
    data: data,
  });
});
