const asyncHandler = require("express-async-handler");
const StatusBco = require("../../models/bco/status_bco");
const { findModelById } = require("../../util/findModelById");
const { ErrorResponse } = require("../../util/errorResponse");

exports.getStatusBco = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getStatusBcoById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(StatusBco, AgesId);

  res.status(200).json({
    message: `Status of  bco`,
    data: result,
  });
});

exports.createStatusBco = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const result = new StatusBco({
    name: name,
    creatorId: req.user._id,
  });

  const results = await result.save();

  res.status(200).json({
    message: `Status of  bco`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateStatusBco = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(StatusBco, AgesId);

  result.name = name;

  const data = await result.save();
  res.status(200).json({
    message: `Status of type bco`,
    data: data,
  });
});

exports.deleteStatusBco = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(StatusBco, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await StatusBco.findByIdAndDelete(AgesId);

  res.status(200).json({
    message: "Status of  bco",
    data: data,
  });
});
