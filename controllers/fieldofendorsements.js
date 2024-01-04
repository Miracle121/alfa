const asyncHandler = require("express-async-handler");
const Fieldofendorsements = require("../models/fieldofendorsements");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getFieldofendorsements = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getFieldofendorsementsById = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const groups = await findModelById(Fieldofendorsements, subgroupsId);

  res.status(200).json({
    message: `Field of endorsements`,
    data: groups,
  });
});

exports.createFieldofendorsements = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const { typeofendorsements, nameoffield, filds } = req.body;

  const group = new Fieldofendorsements({
    typeofendorsements: typeofendorsements,
    nameoffield: nameoffield,
    filds: filds,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `Field of endorsements`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateFieldofendorsements = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;
  const typeofendorsements = req.body.typeofendorsements;
  const titleoffield = req.body.titleoffield;
  const nameoffield = req.body.nameoffield;
  const typeoffield = req.body.typeoffield;

  const groups = await findModelById(Fieldofendorsements, groupsId);

  groups.typeofendorsements = typeofendorsements;
  groups.titleoffield = titleoffield;
  groups.nameoffield = nameoffield;
  groups.typeoffield = typeoffield;

  const groupsofpr = await groups.save();

  res.status(200).json({
    message: `Field of endorsements`,
    data: groupsofpr,
  });
});

exports.deleteFieldofendorsements = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const deleteddata = await findModelById(Fieldofendorsements, subgroupsId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Fieldofendorsements.findByIdAndRemove(subgroupsId);

  res.status(200).json({
    message: `Field of endorsements`,
    data: data,
  });
});
