const asyncHandler = require("express-async-handler");
const Levelofbranch = require("../models/levelofbranch");
const { ErrorResponse } = require("../util/errorResponse");
const { findModelById } = require("../util/findModelById");

exports.getLevelofbranch = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getLevelofbranchById = asyncHandler(async (req, res, next) => {
  const positionId = req.params.id;

  const position = await findModelById(Levelofbranch, positionId);

  res.status(200).json({
    message: `Level of branch List`,
    data: position,
  });
});

exports.createLevelofbranch = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const position = new Levelofbranch({
    name: name,
    creatorId: req.user._id,
  });

  const positions = await position.save();

  res.status(200).json({
    message: `Level of branch List`,
    data: positions,
    creatorId: req.user._id,
  });
});

exports.updateLevelofbranch = asyncHandler(async (req, res, next) => {
  const positionId = req.params.id;
  const name = req.body.name;

  const position = await findmodelById(Levelofbranch, positionId);

  position.name = name;

  const data = await position.save();

  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.deleteLevelofbranch = asyncHandler(async (req, res, next) => {
  const positionId = req.params.id;

  const deleteddata = await findModelById(Levelofbranch, positionId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Levelofbranch.findByIdAndRemove(positionId);

  res.status(200).json({
    message: "Level of branch is deletes",
    data: data,
  });
});
