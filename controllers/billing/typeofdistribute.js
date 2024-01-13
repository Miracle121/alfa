const asyncHandler = require("express-async-handler");
const Typeofdistribute = require("../../models/billing/typeofdistribute");
const { findModelById } = require("../../util/findModelById");

exports.getTypeofdistributes = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTypeofdistributesById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Typeofdistribute, AgesId);

  res.status(200).json({
    message: `Type of distributes list`,
    data: result,
  });
});

exports.createTypeofdistributes = asyncHandler(async (req, res, next) => {
  const nameofoperations = req.body.nameofoperations;
  const debt_account_ID = req.body.debt_account_ID;
  const cred_account_ID = req.body.cred_account_ID;

  const result = new Typeofdistribute({
    nameofoperations: nameofoperations,
    debt_account_ID: debt_account_ID,
    cred_account_ID: cred_account_ID,
    creatorId: req.user._id,
  });

  const results = await result.save();

  res.status(200).json({
    message: `Type of distributes list`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateTypeofdistributes = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const nameofoperations = req.body.nameofoperations;
  const debt_account_ID = req.body.debt_account_ID;
  const cred_account_ID = req.body.cred_account_ID;

  const result = await findModelById(Typeofdistribute, AgesId);

  result.nameofoperations = nameofoperations;
  result.debt_account_ID = debt_account_ID;
  result.cred_account_ID = cred_account_ID;

  const data = await result.save();
  res.status(200).json({
    message: `Type of distributes list`,
    data: data,
  });
});

exports.deleteTypeofdistributes = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Typeofdistribute, AgesId);
  if (!deleteddata) {
    const error = new Error("Object  not found");
    error.statusCode = 404;
    throw error;
  }
  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Typeofdistribute.findByIdAndDelete(AgesId);
  res.status(200).json({
    message: "Accountroles is deleted",
    data: data,
  });
});
