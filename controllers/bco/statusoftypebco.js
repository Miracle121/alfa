const asyncHandler = require("express-async-handler");
const Statusoftypebco = require("../../models/bco/statusoftypebco");
const { findModelById } = require("../../util/findModelById");
const { ErrorResponse } = require("../../util/errorResponse");

exports.getStatusoftypebco = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getStatusoftypebcoById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Statusoftypebco, AgesId);

  res.status(200).json({
    message: `Status of type bco`,
    data: result,
  });
});

exports.createStatusoftypebco = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const result = new Statusoftypebco({
    name: name,
    creatorId: req.userId,
  });

  const results = await result.save();
  res.status(200).json({
    message: `Status of type bco`,
    data: results,
    creatorId: req.userId,
  });
});

exports.updateStatusoftypebco = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(Statusoftypebco, AgesId);

  result.name = name;

  const data = await result.save();
  res.status(200).json({
    message: `Status of type bco`,
    data: data,
  });
});

exports.deleteStatusoftypebco = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Statusoftypebco, AgesId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Statusoftypebco.findByIdAndRemove(AgesId);
  res.status(200).json({
    message: "Status of type bco",
    data: data,
  });
});
