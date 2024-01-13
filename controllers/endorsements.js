const asyncHandler = require("express-async-handler");
const Endorsements = require("../models/endorsements");
const Agreements = require("../models/agreements");
const { findModelById } = require("../util/findModelById");

exports.getEndorsements = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getEndorsementsById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await Endorsements.findById(AgesId);
  if (!result) {
    const error = new Error("Object  not found");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({
    message: `Endorsements list`,
    data: result,
  });
});

exports.createEndorsements = asyncHandler(async (req, res, next) => {
  const agreementsId = req.body.agreementsId;
  const typeofendorsements = req.body.typeofendorsements;
  const reqforconclusion = req.body.reqforconclusion;
  const endorsementsinfo = req.body.endorsementsinfo;
  const statusofendorsements = req.body.statusofendorsements;

  const resultagreements = await findModelById(Agreements, agreementsId);

  const result = new Endorsements({
    agreementsId: agreementsId,
    typeofendorsements: typeofendorsements,
    reqforconclusion: reqforconclusion,
    endorsementsinfo: endorsementsinfo,
    statusofendorsements: statusofendorsements,
    creatorId: req.user._id,
  });

  const results = await result.save();

  resultagreements.policy = results._id;

  const data = await resultagreements.save();

  res.status(200).json({
    message: `Endorsements added`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateEndorsements = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const agreementsId = req.body.agreementsId;
  const typeofendorsements = req.body.typeofendorsements;
  const reqforconclusion = req.body.reqforconclusion;
  const endorsementsinfo = req.body.endorsementsinfo;
  const statusofendorsements = req.body.statusofendorsements;

  const result = await Endorsements.findById(AgesId);
  if (!result) {
    const error = new Error("Object  not found");
    error.statusCode = 404;
    throw error;
  }
  result.name = name;

  const data = await result.save();
  res.status(200).json({
    message: `Accountstatus changed`,
    data: data,
  });
});

exports.deleteEndorsements = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await Endorsements.findById(AgesId);
  if (!deleteddata) {
    const error = new Error("Object  not found");
    error.statusCode = 404;
    throw error;
  }
  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Endorsements.findByIdAndDelete(AgesId);
  res.status(200).json({
    message: "Accountroles is deleted",
    data: data,
  });
});

exports.getEndorsementsByAgreementId = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await Endorsements.find({ agreementsId: AgesId })
    .populate("agreementsId", "agreementsnumber")
    .populate("typeofendorsements", "name")
    .populate("statusofendorsements", "name");
  if (!result) {
    const error = new Error("Object  not found");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({
    message: `Endorsements list`,
    data: result,
  });
});
