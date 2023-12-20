const asyncHandler = require("express-async-handler");
const Statusbcopolicy = require("../../models/bco/statusbcopolicy");
const { ErrorResponse } = require("../../util/errorResponse");

exports.getStatusbcopolicy = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getStatusbcopolicyById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Statusbcopolicy, AgesId);

  res.status(200).json({
    message: `Status bco policy`,
    data: result,
  });
});

exports.createStatusbcopolicy = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const result = new Statusbcopolicy({
    name: name,
    creatorId: req.userId,
  });

  const results = await result.save();

  res.status(200).json({
    message: `Status bco policy`,
    data: results,
    creatorId: req.userId,
  });
});

exports.updateStatusbcopolicy = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(Statusbcopolicy, AgesId);

  result.name = name;

  const data = await result.save();
  res.status(200).json({
    message: `Status bco policy`,
    data: data,
  });
});

exports.deleteStatusbcopolicy = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Statusbcopolicy, AgesId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Statusbcopolicy.findByIdAndRemove(AgesId);

  res.status(200).json({
    message: "Status bco policy",
    data: data,
  });
});
