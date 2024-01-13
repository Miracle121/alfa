const asyncHandler = require("express-async-handler");
const { findModelById } = require("../../util/findModelById");
const Actstatus = require("../../models/bco/actstatus");
const { ErrorResponse } = require("../../util/errorResponse");

exports.getActstatus = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getActstatusById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Actstatus, AgesId);

  res.status(200).json({
    message: `Act status`,
    data: result,
  });
});

exports.createActstatus = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const result = new Actstatus({
    name: name,
    creatorId: req.user._id,
  });

  const results = await result.save();

  res.status(200).json({
    message: `Act status`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateActstatus = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(Actstatus, AgesId);

  result.name = name;

  const data = await result.save();

  res.status(200).json({
    message: `Act status`,
    data,
  });
});

exports.deleteActstatus = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Actstatus, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    throw new ErrorResponse("Bu userni ochirishga imkoni yoq");
  }
  const data = await Actstatus.findByIdAndDelete(AgesId);

  res.status(200).json({
    message: "Status bco policy",
    data: data,
  });
});
