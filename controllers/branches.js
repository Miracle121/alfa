const asyncHandler = require("express-async-handler");
const Branches = require("../models/branches");
const moment = require("moment");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getBranches = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getBranchesById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const populateOptions = [
    { path: "region", select: "name" },
    { path: "breanchstatus", select: "name" },
    { path: "agents" },
    {
      path: "employees",
      populate: [{ path: "positions", select: "name" }],
    },
  ];

  const result = await findModelById(Branches, AgesId, populateOptions);

  res.status(200).json({
    message: `Branches List`,
    data: result,
  });
});

exports.createBranches = asyncHandler(async (req, res, next) => {
  const {
    levelofbreanches,
    codeofbranches,
    inn,
    district,
    branchname,
    shorttitleofbranch,
    address,
    telephone,
    email,
    agreementnumber,
    agreementdate,
    expirationdate,
    employees,
    checkingaccount,
    mfo,
    nameofbank,
    breanchstatus,
  } = req.body;

  const result = new Branches({
    levelofbreanches,
    codeofbranches,
    inn,
    district,
    branchname,
    shorttitleofbranch,
    address,
    telephone,
    email,
    agreementnumber,
    agreementdate: moment(agreementdate, "DD/MM/YYYY"),
    expirationdate: moment(expirationdate, "DD/MM/YYYY"),
    employees,
    checkingaccount,
    mfo,
    nameofbank,
    breanchstatus,
    creatorId: req.user._id,
  });

  const results = await result.save();

  res.status(200).json({
    message: `Branches List`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateBranches = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const {
    levelofbreanches,
    codeofbranches,
    inn,
    region,
    branchname,
    shorttitleofbranch,
    address,
    telephone,
    email,
    agreementnumber,
    agreementdate,
    expirationdate,
    employees,
    checkingaccount,
    mfo,
    nameofbank,
    breanchstatus,
  } = req.body;

  const result = await findModelById(Branches, AgesId);
  if (!result) {
    const error = new Error("Object not found");
    error.statusCode = 404;
    throw error;
  }

  result.levelofbreanches = levelofbreanches;
  result.codeofbranches = codeofbranches;
  result.inn = inn;
  result.region = region;
  result.branchname = branchname;
  result.shorttitleofbranch = shorttitleofbranch;
  result.address = address;
  result.telephone = telephone;
  result.email = email;
  result.agreementnumber = agreementnumber;
  result.agreementdate = moment(agreementdate, "DD/MM/YYYY");
  result.expirationdate = moment(expirationdate, "DD/MM/YYYY");
  result.employees = employees;
  result.checkingaccount = checkingaccount;
  result.mfo = mfo;
  result.nameofbank = nameofbank;
  result.breanchstatus = breanchstatus;

  const data = await result.save();
  res.status(200).json({
    message: `Branches List`,
    data,
  });
});

exports.deleteBranches = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Branches, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Branches.findByIdAndRemove(AgesId);
  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});
