const asyncHandler = require("express-async-handler");
const Statusofpolicy = require("../models/statusofpolicy");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getStatusofpolicy = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getStatusofpolicyById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Statusofpolicy, AgesId);

  res.status(200).json({
    message: `Status of payment list`,
    data: result,
  });
});

exports.createStatusofpolicy = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const result = new Statusofpolicy({
    name: name,
    creatorId: req.user._id,
  });

  const results = await result.save();

  res.status(200).json({
    message: `Status of payment list`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateStatusofpolicy = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(Statusofpolicy, AgesId);

  result.name = name;

  const data = await result.save();

  res.status(200).json({
    message: `Status of payment list`,
    data: data,
  });
});

exports.deleteStatusofpolicy = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Statusofpolicy, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Statusofpolicy.findByIdAndDelete(AgesId);

  res.status(200).json({
    message: "Accountroles is deleted",
    data: data,
  });
});
