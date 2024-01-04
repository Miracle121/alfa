const asyncHandler = require("express-async-handler");
const StatusActs = require("../../models/bco/status_acts");
const { findModelById } = require("../../util/findModelById");
const { ErrorResponse } = require("../../util/errorResponse");

exports.getStatusActs = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getStatusActsById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(StatusActs, AgesId);

  res.status(200).json({
    message: `Status of  Acts`,
    data: result,
  });
});

exports.createStatusActs = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const result = new StatusActs({
    name: name,
    creatorId: req.user._id,
  });
  const results = await result.save();
  res.status(200).json({
    message: `Status of  Acts`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateStatusActs = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(StatusActs, AgesId);

  result.name = name;

  const data = await result.save();

  res.status(200).json({
    message: `Status of Acts`,
    data: data,
  });
});

exports.deleteStatusActs = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(StatusActs, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("Bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await StatusActs.findByIdAndRemove(AgesId);

  res.status(200).json({
    message: "Status of  Acts",
    data: data,
  });
});
