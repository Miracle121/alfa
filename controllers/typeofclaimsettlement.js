const asyncHandler = require("express-async-handler");
const Typeofclaimsettlements = require("../models/typeofclaimsettlement");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getTypeofclaimsettlement = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.status(200).json(res.advancedResults));
});

exports.getTypeofclaimsettlementById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Typeofclaimsettlements, AgesId);

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: result,
  });
});

exports.createTypeofclaimsettlement = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const result = new Typeofclaimsettlements({
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

exports.updateTypeofclaimsettlement = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(Typeofclaimsettlements, AgesId);

  result.name = name;
  // result.url=url
  const data = await result.save();
  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.deleteTypeofclaimsettlement = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Typeofclaimsettlements, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Typeofclaimsettlements.findByIdAndRemove(AgesId);
  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});
