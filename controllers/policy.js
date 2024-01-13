const asyncHandler = require("express-async-handler");
const moment = require("moment");

const Policy = require("../models/policy");
const Agreements = require("../models/agreements");
const Policyblank = require("../models/bco/policyblank");

const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

const populateOptions = [
  { path: "branch_id", select: "inn" },
  { path: "agreementsId", select: "agreementsnumber" },
  { path: "policy_blanknumber", select: "blank_number" },
  { path: "typeofpoliceId", select: "name" },
  { path: "statusofpolicy", select: "name" },
  { path: "statusofpayment", select: "name" },
  { path: "objectofinsurance.typeofobjects", select: "name" },
  { path: "objectofinsurance.objects", select: "name" },
  { path: "objectofinsurance.region", select: "name" },
  { path: "objectofinsurance.districtsId", select: "name" },
  { path: "riskId.riskgroup", select: "name" },
  { path: "riskId.risk", select: "name" },
  { path: "riskId.classeId", select: "name" },
  { path: "statusofpolicy", select: "name" },
  { path: "statusofpayment", select: "name" },
];

exports.getPolicy = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getPolicyById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Policy, AgesId, populateOptions);

  res.status(200).json({
    message: `Policy List`,
    data: result,
  });
});

exports.createPolicy = asyncHandler(async (req, res, next) => {
  const agreementsId = req.body.agreementsId;
  const policy_blanknumber = req.body.policy_blanknumber;
  const policy_number = req.body.policy_number;
  const typeofpoliceId = req.body.typeofpoliceId;
  const dateofissue = moment(req.body.dateofissue, "DD/MM/YYYY");
  const dateofend = moment(req.body.dateofend, "DD/MM/YYYY");

  const unixdateofissue = new Date(dateofissue);
  const dateofissueunix = Math.floor(unixdateofissue.getTime() / 1000);
  const unixdateofendunix = new Date(dateofend);
  const dateofendunix = Math.floor(unixdateofendunix.getTime() / 1000);

  const copyofdocuments = req.body.copyofdocuments;
  const riskId = req.body.riskId;
  const objectofinsurance = req.body.objectofinsurance;
  const statusofpolicy = req.body.statusofpolicy;
  const statusofpayment = req.body.statusofpayment;

  const resultagreements = await findModelById(Agreements, agreementsId);

  const policyblanknumber = await findModelById(
    Policyblank,
    policy_blanknumber
  );

  const branch_id = resultagreements.branch;

  const result = new Policy({
    branch_id: branch_id,
    agreementsId: agreementsId,
    policy_blanknumber: policy_blanknumber,
    policy_number: policy_number,
    typeofpoliceId: typeofpoliceId,
    dateofissue: dateofissue,
    dateofend: dateofend,
    dateofissueunix: dateofissueunix,
    dateofendunix: dateofendunix,
    copyofdocuments: copyofdocuments,
    riskId: riskId,
    objectofinsurance: objectofinsurance,
    statusofpolicy: statusofpolicy,
    statusofpayment: statusofpayment,
    creatorId: req.user._id,
  });
  const results = await result.save();

  resultagreements.policy = results._id;
  await resultagreements.save();
  policyblanknumber.policy_number = policy_number;
  policyblanknumber.policy_id = results._id;
  policyblanknumber.Is_usedblank = true;
  policyblanknumber.branch_id = branch_id;

  await policyblanknumber.save();

  res.status(200).json({
    message: `Policy List`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updatePolicy = asyncHandler(async (req, res, next) => {
  const policyId = req.params.id;

  let {
    copyofdocuments,
    riskId,
    objectofinsurance,
    statusofpolicy,
    statusofpayment,
    typeofpoliceId,
    formnumber,
    policynumber,
    agreementsId,
    dateofissue,
    dateofend,
  } = req.body;

  dateofissue = dateofissue
    ? moment(req.body.dateofissue, "DD.MM.YYYY", true)
    : undefined;

  dateofend = dateofend
    ? moment(req.body.dateofend, "DD.MM.YYYY", true)
    : undefined;

  const dateofissueunix = dateofissue ? dateofissue.unix() : undefined;
  const dateofendunix = dateofend ? dateofend.unix() : undefined;

  await findModelById(Policy, policyId);

  const result = await Policy.findByIdAndUpdate(
    policyId,
    {
      copyofdocuments,
      riskId,
      objectofinsurance,
      statusofpolicy,
      statusofpayment,
      typeofpoliceId,
      formnumber,
      policynumber,
      agreementsId,
      dateofissueunix,
      dateofendunix,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    message: `Policy`,
    data: result,
  });
});

exports.deletePolicy = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Policy, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("Bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Policy.findByIdAndDelete(AgesId);

  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});
