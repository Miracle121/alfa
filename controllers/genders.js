const asyncHandler = require("express-async-handler");
const Genders = require("../models/genders");
const { findModelById } = require("../util/findModelById");

exports.getGenders = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getGendersById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Genders, AgesId);

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: result,
  });
});

exports.createGenders = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const result = new Genders({
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

exports.updateGenders = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(Genders, AgesId);

  result.name = name;
  const data = await result.save();
  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.deleteGenders = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Genders, AgesId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Genders.findByIdAndRemove(AgesId);

  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});
