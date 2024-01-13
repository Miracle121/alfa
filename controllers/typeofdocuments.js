const asyncHandler = require("express-async-handler");
const Typeofdocuments = require("../models/typeofdocuments");
const { ErrorResponse } = require("../util/errorResponse");
const { findModelById } = require("../util/findModelById");

exports.getTypeofdocuments = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTypeofdocumentsById = asyncHandler(async (req, res, next) => {
  const positionId = req.params.id;

  const position = await findModelById(Typeofdocuments, positionId);

  res.status(200).json({
    message: `Position List`,
    data: position,
  });
});

exports.createTypeofdocuments = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const position = new Typeofdocuments({
    name: name,
    creatorId: req.user._id,
  });

  const positions = await position.save();

  res.status(200).json({
    message: `Position List`,
    data: positions,
    creatorId: req.user._id,
  });
});

exports.updateTypeofdocuments = asyncHandler(async (req, res, next) => {
  const positionId = req.params.id;
  const name = req.body.name;

  const position = await findModelById(Typeofdocuments, positionId);

  position.name = name;

  const data = await position.save();
  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.deleteTypeofdocuments = asyncHandler(async (req, res, next) => {
  const positionId = req.params.id;

  const deleteddata = await findModelById(Typeofdocuments, positionId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Typeofdocuments.findByIdAndDelete(positionId);

  res.status(200).json({
    message: "Position is deletes",
    data: data,
  });
});
