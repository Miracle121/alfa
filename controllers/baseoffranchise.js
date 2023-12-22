const asyncHandler = require("express-async-handler");
const Baseoffranchise = require("../models/baseoffranchise");
const User = require("../models/users");
const { findModelById } = require("../util/findModelById");

exports.getBaseoffranchise = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getBaseoffranchiseById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Baseoffranchise, AgesId);

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: result,
  });
});

exports.createBaseoffranchise = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const result = new Baseoffranchise({
    name: name,
    creatorId: req.user._id,
  });
  const results = await result.save();

  res.status(200).json({
    message: `ma'lumotlar kiritildi`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateBaseoffranchise = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(Baseoffranchise, AgesId);

  result.name = name;

  const data = await result.save();
  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.deleteBaseoffranchise = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Baseoffranchise, AgesId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Baseoffranchise.findByIdAndRemove(AgesId);

  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});
