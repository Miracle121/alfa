const asyncHandler = require("express-async-handler");
const Statusofpayment = require("../models/statusofpayment");
const { ErrorResponse } = require("../util/errorResponse");
const { findModelById } = require("../util/findModelById");

exports.getStatusofpayment = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getStatusofpaymentById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Statusofpayment, AgesId);

  res.status(200).json({
    message: `Status of payment list`,
    data: result,
  });
});

exports.createStatusofpayment = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const result = new Statusofpayment({
    name: name,
    creatorId: req.user._id,
  });

  const results = await result.save();

  res.status(201).json({
    message: `Status of payment list`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateStatusofpayment = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(Statusofpayment, AgesId);

  result.name = name;

  const data = await result.save();
  res.status(200).json({
    message: `Status of payment list`,
    data: data,
  });
});

exports.deleteStatusofpayment = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Statusofpayment, AgesId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Statusofpayment.findByIdAndRemove(AgesId);

  res.status(200).json({
    message: "Accountroles is deleted",
    data: data,
  });
});
