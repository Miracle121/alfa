const asyncHandler = require("express-async-handler");
const Bcoinpolicyblank = require("../../models/bco/bcoinpolicyblank");
const moment = require("moment");
const { findModelById } = require("../../util/findModelById");

exports.getBcoinpolicyblank = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getBcoinpolicyblankById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const populate = [
    { path: "sender_employee_id", select: "name" },
    { path: "statusofbcopolicy", select: "name" },
    { path: "employee_id", select: "name" },
  ];

  const result = await findModelById(Bcoinpolicyblank, AgesId, populate);

  res.status(200).json({
    message: `Type of Acts`,
    data: result,
  });
});

exports.createBcoinpolicyblank = asyncHandler(async (req, res, next) => {
  const {
    act_number,
    act_date,
    sender_branch_id,
    sender_employee_id,
    receiver_branch_id,
    receiver_employee_id,
    policy_type_id,
    policyId,
  } = req.body;

  const result = new Bcoinpolicyblank({
    act_number,
    act_date: moment(act_date, "DD/MM/YYYY"),
    sender_branch_id,
    sender_employee_id,
    receiver_branch_id,
    receiver_employee_id,
    policy_type_id,
    policyId,
    creatorId: req.user._id,
  });

  const savedResult = await result.save();

  res.status(200).json({
    message: "Type of Acts added",
    data: savedResult,
    creatorId: req.user._id,
  });
});

exports.updateBcoinpolicyblank = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const {
    act_number,
    act_date,
    sender_branch_id,
    sender_employee_id,
    receiver_branch_id,
    receiver_employee_id,
    policy_type_id,
    policyId,
  } = req.body;

  const result = await findModelById(Bcoinpolicyblank, id);

  Object.assign(result, {
    act_number,
    act_date,
    sender_branch_id,
    sender_employee_id,
    receiver_branch_id,
    receiver_employee_id,
    policy_type_id,
    policyId,
  });

  const updatedResult = await result.save();

  res.status(200).json({
    message: "Type of Acts changed",
    data: updatedResult,
  });
});

exports.updateBcoinpolicyblank = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const {
    act_number,
    act_date,
    sender_branch_id,
    sender_employee_id,
    receiver_branch_id,
    receiver_employee_id,
    policy_type_id,
    policyId,
  } = req.body;

  const result = await findModelById(Bcoinpolicyblank, id);

  Object.assign(result, {
    act_number,
    act_date,
    sender_branch_id,
    sender_employee_id,
    receiver_branch_id,
    receiver_employee_id,
    policy_type_id,
    policyId,
  });

  const updatedResult = await result.save();

  res.status(200).json({
    message: "Type of Acts changed",
    data: updatedResult,
  });
});

exports.deleteBcoinpolicyblank = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await Bcoinpolicyblank.findById(AgesId);
  if (!deleteddata) {
    const error = new Error("Object  not found");
    error.statusCode = 404;
    throw error;
  }
  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Bcoinpolicyblank.findByIdAndDelete(AgesId);
  res.status(200).json({
    message: "Type of Acts is deleted",
    data: data,
  });
});
