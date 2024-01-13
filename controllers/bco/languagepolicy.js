const asyncHandler = require("express-async-handler");
const Languagepolicy = require("../../models/bco/languagepolicy");
const { ErrorResponse } = require("../../util/errorResponse");
const { findModelById } = require("../../util/findModelById");

exports.getLanguagepolicy = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advencedResults);
});

exports.getLanguagepolicyById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Languagepolicy, AgesId);

  res.status(200).json({
    message: `Language Policy  list`,
    data: result,
  });
});

exports.createLanguagepolicy = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const result = new Languagepolicy({
    name: name,
    creatorId: req.user._id,
  });

  await result.save();

  res.status(200).json({
    message: `Language Policy added`,
    data: result,
    creatorId: req.user._id,
  });
});

exports.updateLanguagepolicy = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(Languagepolicy, AgesId);

  result.name = name;

  const data = await result.save();

  res.status(200).json({
    message: `Language Policy changed`,
    data,
  });
});

exports.deleteLanguagepolicy = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Languagepolicy, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    throw new ErrorResponse("Bu userni ochirishga imkoni yoq", 403);
  }

  const data = await Languagepolicy.findByIdAndDelete(AgesId);

  res.status(200).json({
    message: "Language Policy deleted",
    data,
  });
});
