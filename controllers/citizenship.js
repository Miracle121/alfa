const asyncHandler = require("express-async-handler");
const Citizenship = require("../models/citizenship");

exports.getCitizenship = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getCitizenshipById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Citizenship, AgesId);

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: result,
  });
});

exports.createCitizenship = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const result = new Citizenship({
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

exports.updateCitizenship = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(Citizenship, AgesId);

  result.name = name;
  const data = await result.save();
  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.deleteCitizenship = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Citizenship, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Citizenship.findByIdAndDelete(AgesId);
  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});
