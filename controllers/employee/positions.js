const asyncHandler = require("express-async-handler");
const Positions = require("../../models/employee/positions");

exports.getPositions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getPositionsById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await Positions.findById(AgesId);
  if (!result) {
    const error = new Error("Object  not found");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({
    message: `Positions list`,
    data: result,
  });
});

exports.createPositions = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const result = new Positions({
    name: name,
    creatorId: req.user._id,
  });
  const results = await result.save();
  res.status(200).json({
    message: `Positions added`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updatePositions = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await Positions.findById(AgesId);
  if (!result) {
    const error = new Error("Object  not found");
    error.statusCode = 404;
    throw error;
  }
  result.name = name;

  const data = await result.save();
  res.status(200).json({
    message: `Positions changed`,
    data: data,
  });
});

exports.deletePositions = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await Positions.findById(AgesId);
  if (!deleteddata) {
    const error = new Error("Object  not found");
    error.statusCode = 404;
    throw error;
  }
  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Positions.findByIdAndRemove(AgesId);
  res.status(200).json({
    message: "Positions is deleted",
    data: data,
  });
});
