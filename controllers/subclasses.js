const asyncHandler = require("express-async-handler");
const Subclasses = require("../models/subclasses");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getSubClassesofproduct = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getSubClassesofproductId = asyncHandler(async (req, res, next) => {
  const classesId = req.params.id;

  const classesofproduct = await findModelById(Subclasses, classesId);

  res.status(200).json({
    message: `SubClasse of products`,
    data: classesofproduct,
  });
});

exports.createSubClassesofproduct = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;
  const classesId = req.body.classId;

  const group = new Subclasses({
    name: name,
    classId: classesId,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `SubClasse of products`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateSubClassesofproduct = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;
  const name = req.body.name;
  const classesId = req.body.classId;

  const groups = await findModelById(Subclasses, groupsId);

  groups.name = name;
  groups.classId = classesId;

  const classesofproduct = await groups.save();

  res.status(200).json({
    message: `SubClasse of products`,
    data: classesofproduct,
  });
});

exports.deleteSubClassesofproduct = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const deleteddata = await findModelById(Subclasses, subgroupsId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Subclasses.findByIdAndDelete(subgroupsId);

  res.status(200).json({
    message: "SubClasse of products",
    data: data,
  });
});
