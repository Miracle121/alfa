const asyncHandler = require("express-async-handler");
const Position = require("../models/position");
const { findModelById } = require("../util/findModelById");

exports.getPosition = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getPositionById = asyncHandler(async (req, res, next) => {
  const positionId = req.params.id;

  const position = await findModelById(Position, positionId);

  res.status(200).json({
    message: `Position List`,
    data: position,
  });
});

exports.createPosition = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const position = new Position({
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

exports.updatePosition = asyncHandler(async (req, res, next) => {
  const positionId = req.params.id;
  const name = req.body.name;

  const position = await findModelById(Position, positionId);

  position.name = name;

  const data = await position.save();

  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.deletePosition = asyncHandler(async (req, res, next) => {
  const positionId = req.params.id;

  const deleteddata = await findModelById(Position, positionId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Position.findByIdAndRemove(positionId);

  res.status(200).json({
    message: "Position is deletes",
    data: data,
  });
});
