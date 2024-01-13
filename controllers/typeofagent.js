const asyncHandler = require("express-async-handler");
const Typeofagent = require("../models/typeofagent");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getTypeofagent = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.status(200).json(res.advancedResults));
});

exports.getTypeofagentById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Typeofagent, AgesId);

  res.status(200).json({
    message: `Type of agents`,
    data: result,
  });
});

exports.createTypeofagent = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const result = new Typeofagent({
    name,
    creatorId: req.user._id,
  });

  const results = await result.save();

  res.status(200).json({
    message: `Type of agents`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateTypeofagent = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(Typeofagent, AgesId);

  result.name = name;

  const data = await result.save();
  res.status(200).json({
    message: `Type of agents`,
    data: data,
  });
});

exports.deleteTypeofagent = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Typeofagent, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Typeofagent.findByIdAndDelete(AgesId);

  res.status(200).json({
    message: "Type of agents is deletes",
    data: data,
  });
});
