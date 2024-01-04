const asyncHandler = require("express-async-handler");
const Contractform = require("../models/contractform");
const uploadFile = require("../middleware/upload");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getContractform = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getContractformById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Contractform, AgesId);

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: result,
  });
});

exports.createContractform = asyncHandler(async (req, res, next) => {
  const directoryPath = __basedir + "/uploads/";

  await uploadFile(req, res);
  if (req.file == undefined) {
    res.status(400).send({ message: "Please upload a file!" });
  }

  const name = req.file.originalname; //req.body.name
  const url = directoryPath + name; //req.body.url

  const result = new Contractform({
    name: name,
    url: url,
    creatorId: req.user._id,
  });

  const results = await result.save();

  res.status(200).json({
    message: `ma'lumotlar kiritildi`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateContractform = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.file.originalname; //req.body.name
  const url = directoryPath + name; //req.body.url

  const result = await findModelById(Contractform, AgesId);

  result.name = name;
  result.url = url;

  const data = await result.save();

  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.deleteContractform = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Contractform, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Contractform.findByIdAndRemove(AgesId);

  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});
