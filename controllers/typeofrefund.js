const asyncHandler = require("express-async-handler");
const Typeofrefund = require("../models/typeofrefund");
const { ErrorResponse } = require("../util/errorResponse");

exports.getTypeofrefund = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTypeofrefundById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Typeofrefund, AgesId);

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: result,
  });
});

exports.createTypeofrefund = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const result = new Typeofrefund({
    name: name,
    creatorId: req.user._id,
  });

  const results = await result.save();

  res.status(201).json({
    message: `ma'lumotlar kiritildi`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateTypeofrefund = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const name = req.body.name;

  const result = await findModelById(Typeofrefund, AgesId);

  result.name = name;

  const data = await result.save();
  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.deleteTypeofrefund = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Typeofrefund, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Typeofrefund.findByIdAndRemove(AgesId);

  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});
