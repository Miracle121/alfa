const asyncHandler = require("express-async-handler");
const Breanches = require("../models/breanches");
const moment = require("moment");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getBreanches = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getBreanchesById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const populateOptions = [
    { path: "regionId", select: "name" },
    { path: "breanchstatus", select: "name" },
    {
      path: "employees",
      populate: [{ path: "positions", select: "name" }],
    },
  ];

  const result = await findModelById(Breanches, AgesId, populateOptions);

  res.status(200).json({
    message: `Breanches List`,
    data: result,
  });
});

exports.createBreanches = asyncHandler(async (req, res, next) => {
  const {
    levelofbreanches,
    codeofbreanches,
    inn,
    regionId,
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

  const result = new Breanches({
    levelofbreanches,
    codeofbreanches,
    inn,
    regionId,
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

exports.updateBreanches = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const {
    levelofbreanches,
    codeofbreanches,
    inn,
    regionId,
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

  const result = await findModelById(Breanches, AgesId);
  if (!result) {
    const error = new Error("Object not found");
    error.statusCode = 404;
    throw error;
  }

  result.levelofbreanches = levelofbreanches;
  result.codeofbreanches = codeofbreanches;
  result.inn = inn;
  result.regionId = regionId;
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

exports.deleteBreanches = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Breanches, AgesId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Breanches.findByIdAndRemove(AgesId);
  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});
