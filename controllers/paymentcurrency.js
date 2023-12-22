const asyncHandler = require("express-async-handler");
const Paymentcurrency = require("../models/paymentcurrency");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getPaymentcurrency = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getPaymentcurrencyId = asyncHandler(async (req, res, next) => {
  const typeofpaymentId = req.params.id;

  const typeofpayment = await findModelById(Paymentcurrency, typeofpaymentId);

  res.status(200).json({
    message: `List of police`,
    data: typeofpayment,
  });
});

exports.createPaymentcurrency = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;

  const group = new Paymentcurrency({
    name: name,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `Police added`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updatePaymentcurrency = asyncHandler(async (req, res, next) => {
  const typeofriskId = req.params.id;
  const name = req.body.name;

  const groups = await findModelById(Paymentcurrency, typeofriskId);

  groups.name = name;

  const typeofrisk = await groups.save();

  res.status(200).json({
    message: `Police added`,
    data: typeofrisk,
  });
});

exports.deletePaymentcurrency = asyncHandler(async (req, res, next) => {
  const typeofpaymentId = req.params.id;

  const deleteddata = await findModelById(Paymentcurrency, typeofpaymentId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Paymentcurrency.findByIdAndRemove(typeofpaymentId);

  res.status(200).json({
    message: "Risks is deleted",
    data: data,
  });
});
