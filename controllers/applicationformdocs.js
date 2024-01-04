const asyncHandler = require("express-async-handler");
const Applicationformdocs = require("../models/applicationformdocs");
const uploadFile = require("../middleware/upload");
const { ErrorResponse } = require("../util/errorResponse");
const { findModelById } = require("../util/findModelById");

exports.getApplicationformdocs = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getApplicationformdocsById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Applicationformdocs, AgesId);

  res.status(200).json({
    message: `Ma'lumotlar topildi`,
    data: result,
  });
});

exports.createApplicationformdocs = asyncHandler(async (req, res, next) => {
  const directoryPath = __basedir + "/uploads/";

  await uploadFile(req, res);

  if (req.file == undefined) {
    res.status(400).send({ message: "Please upload a file!" });
  }
  const name = req.file.originalname; //req.body.name
  const url = directoryPath + name; //req.body.url
  const result = new Applicationformdocs({
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

exports.updateApplicationformdocs = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.file.originalname; //req.body.name
  const url = directoryPath + name; //req.body.url

  const result = await findModelById(Applicationformdocs, AgesId);

  result.name = name;
  result.url = url;

  const data = await result.save();

  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.deleteApplicationformdocs = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Applicationformdocs, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("Mumkin emas!!!", 403);
    throw error;
  }

  const data = await Applicationformdocs.findByIdAndRemove(AgesId);

  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});
