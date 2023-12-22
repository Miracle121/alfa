const asyncHandler = require("express-async-handler");
const Accountroles = require("../models/accountroles");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getAccountroles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getAccountrolesById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Accountroles, AgesId);

  res.status(200).json({
    message: `Accountroles list`,
    data: result,
  });
});

exports.createAccountroles = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const result = new Accountroles({
    name: name,
    creatorId: req.user._id,
  });

  const results = await result.save();

  res.status(200).json({
    message: `Accountroles added`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateAccountroles = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(Accountroles, AgesId);

  result.name = name;

  const data = await result.save();
  res.status(200).json({
    message: `Accountstatus changed`,
    data: data,
  });
});

exports.deleteAccountroles = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Accountroles, AgesId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Accountroles.findByIdAndRemove(AgesId);
  res.status(200).json({
    message: "Accountroles is deleted",
    data: data,
  });
});
