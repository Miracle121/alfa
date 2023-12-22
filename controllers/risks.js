const asyncHandler = require("express-async-handler");
const Risks = require("../models/risks");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");

exports.getRisks = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getRisksId = asyncHandler(async (req, res, next) => {
  const riskId = req.params.id;

  const typeofrisk = await findModelById(Risks, riskId, [
    { path: "typeofrisksId", select: "name" },
    { path: "classesId", select: "name" },
  ]);

  res.status(200).json({
    message: `Risks list`,
    data: typeofrisk,
  });
});

exports.createRisks = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;
  const typeofrisksId = req.body.typeofrisksId;
  const classesId = req.body.classesId;
  const categorynumber = req.body.categorynumber;

  const group = new Risks({
    name: name,
    typeofrisksId: typeofrisksId,
    classesId: classesId,
    categorynumber: categorynumber,
    creatorId: req.user._id,
  });

  const groups = await group.save();
  res.status(201).json({
    message: `Risk added`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateRisks = asyncHandler(async (req, res, next) => {
  const typeofriskId = req.params.id;
  const name = req.body.name;
  const typeofrisksId = req.body.typeofrisksId;
  const classesId = req.body.classesId;
  const categorynumber = req.body.categorynumber;

  const groups = await findModelById(Risks, typeofriskId);

  groups.name = name;
  groups.typeofrisksId = typeofrisksId;
  groups.classesId = classesId;
  groups.categorynumber = categorynumber;

  const typeofrisk = await groups.save();

  res.status(200).json({
    message: `Risks is changed`,
    data: typeofrisk,
  });
});

exports.deleteRisks = asyncHandler(async (req, res, next) => {
  const typeofrisksId = req.params.id;

  const deleteddata = await findModelById(Risks, typeofrisksId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Risks.findByIdAndRemove(typeofrisksId);

  res.status(200).json({
    message: "Risks is deleted",
    data: data,
  });
});
