const asyncHandler = require("express-async-handler");
const Accountstatus = require("../models/accountstatus");
const { findModelById } = require("../util/findModelById");

exports.getAccountstatus = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getAccountstatusById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Accountstatus, AgesId);

  res.status(200).json({
    message: `Accountstatus list`,
    data: result,
  });
});

exports.createAccountstatus = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const result = new Accountstatus({
    name: name,
    creatorId: req.user._id,
  });
  const results = await result.save();
  res.status(200).json({
    message: `Accountstatus added`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateAccountstatus = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(Accountstatus, AgesId);

  result.name = name;

  const data = await result.save();

  res.status(200).json({
    message: `Accountstatus changed`,
    data: data,
  });
});

exports.deleteAccountstatus = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Accountstatus, AgesId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Accountstatus.findByIdAndRemove(AgesId);
  res.status(200).json({
    message: "Accountstatus is deleted",
    data: data,
  });
});
