const asyncHandler = require("express-async-handler");
const Additionaldocuments = require("../models/additionaldocuments");
const uploadFile = require("../middleware/upload");
const fs = require("fs");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getadditionaldocuments = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

exports.getAdditionaldocumentsById = async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Additionaldocuments, AgesId);

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: result,
  });
};
exports.createAdditionaldocuments = async (req, res, next) => {
  const directoryPath = __basedir + "/uploads/";

  await uploadFile(req, res);

  if (req.file == undefined) {
    res.status(400).send({ message: "Please upload a file!" });
  }
  const name = req.file.originalname; //req.body.name
  const url = directoryPath + name; //req.body.url

  const result = new Additionaldocuments({
    name,
    url,
    creatorId: req.user._id,
  });

  const results = await result.save();

  res.status(200).json({
    message: `Ma'lumotlar kiritildi`,
    data: results,
    creatorId: req.user._id,
  });
};
exports.updateAdditionaldocuments = async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.file.originalname; //req.body.name
  const url = directoryPath + name; //req.body.url

  const result = await findModelById(Additionaldocuments, AgesId);

  result.name = name;
  result.url = url;

  const data = await result.save();

  res.status(200).json({
    message: `Ma'lumotlar o'zgartirildi`,
    data: data,
  });
};
exports.deleteAdditionaldocuments = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Additionaldocuments, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Additionaldocuments.findByIdAndDelete(AgesId);
  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});

exports.upload = asyncHandler(async (req, res) => {
  await uploadFile(req, res);
  if (req.file == undefined)
    throw new ErrorResponse("Please upload a file!", 400);

  res.status(200).send({
    message: "Uploaded the file successfully: " + req.file.originalname,
  });
});

exports.getListFiles = asyncHandler(async (req, res) => {
  const directoryPath = __basedir + "/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: directoryPath + file,
      });
    });
    res.status(200).send(fileInfos);
  });
});

exports.download = asyncHandler(async (req, res) => {
  const fileName = req.params.name;

  const directoryPath = __basedir + "/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
});
