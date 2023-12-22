const asyncHandler = require("express-async-handler");
const Classesofproduct = require("../models/classes");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");

exports.getClassesofproduct = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getClassesofproductId = asyncHandler(async (req, res, next) => {
  const classesId = req.params.id;

  const classesofproduct = await findModelById(Classesofproduct, classesId);

  res.status(200).json({
    message: `Classe of products`,
    data: classesofproduct,
  });
});

exports.createClassesofproduct = asyncHandler(async (req, res, next) => {
  let creator;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }
  const name = req.body.name;
  const color = req.body.color;

  const group = new Classesofproduct({
    name: name,
    color: color,
    creatorId: req.user._id,
  });
  const groups = await group.save();
  res.status(201).json({
    message: `Classe of products`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateClassesofproduct = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;
  const name = req.body.name;
  const coolers = req.body.coolers;

  const groups = await findModelById(Classesofproduct, groupsId);

  groups.name = name;
  groups.coolers = coolers;
  const classesofproduct = await groups.save();
  res.status(200).json({
    message: `Classe of products`,
    data: classesofproduct,
  });
});

exports.deleteClassesofproduct = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const deleteddata = await findModelById(Classesofproduct, subgroupsId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Classesofproduct.findByIdAndRemove(subgroupsId);

  res.status(200).json({
    message: "Classe of products",
    data: data,
  });
});
