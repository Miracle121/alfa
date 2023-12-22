const asyncHandler = require("express-async-handler");
const Statusofproducts = require("../models/statusofproduct");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getStatusOfProduct = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getStatusOfProductById = asyncHandler(async (req, res, next) => {
  const statusID = req.params.id;

  const groups = await findModelById(Statusofproducts, statusID);

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    statusofproduct: groups,
  });
});

exports.createStatusOfProduct = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;

  const group = new Statusofproducts({
    name: name,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `ma'lumotlar kiritildi`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateStatusOfProduct = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;
  const name = req.body.name;

  const groups = await findModelById(Statusofproducts, groupsId);

  groups.name = name;

  const groupsofpr = await groups.save();

  res.status(200).json({
    message: `Status of product  changed`,
    data: groupsofpr,
  });
});

exports.deleteStatusOfProduct = asyncHandler(async (req, res, next) => {
  const statusId = req.params.id;

  const deleteddata = await findModelById(Statusofproducts, statusId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Statusofproducts.findByIdAndRemove(statusId);

  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});
