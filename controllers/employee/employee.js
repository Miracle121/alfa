const asyncHandler = require("express-async-handler");
const moment = require("moment");
const Employees = require("../../models/employee/employee");
const User = require("../../models/users");
const { findModelById } = require("../../util/findModelById");
const { ErrorResponse } = require("../../util/errorResponse");

exports.getEmployees = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getEmployeesById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const populateOptions = [
    { path: "branch", select: "branchname" },
    { path: "gender", select: "name" },
    { path: "citizenship", select: "name" },
    { path: "regions", select: "name" },
    { path: "districts", select: "name" },
    { path: "position", select: "name" },
    {
      path: "user_id",
      select: "email branch_Id accountstatus accountrole ",
      populate: [
        { path: "branch_Id", select: "branchname" },
        { path: "accountstatus", select: "name" },
        { path: "accountrole", select: "name" },
      ],
    },
  ];

  const result = await findModelById(Employees, AgesId, populateOptions);

  res.status(200).json({
    message: `Employees List`,
    data: result,
  });
});

exports.createEmployees = asyncHandler(async (req, res, next) => {
  if (req.body.request) req.body = JSON.parse(req.body.request);

  const {
    branch,
    name,
    secondname,
    middlename,
    gender,
    dateofbirth,
    citizenship,
    passportSeries,
    passportNumber,
    pin,
    regions,
    districts,
    address,
    telephonenumber,
    job_title,
    position,
  } = req.body;

  let filepath = null;

  if (req.file) {
    filepath = `${req.filePath}/${req.file.filename}`;
  }

  const result = new Employees({
    branch: branch,
    photo: filepath,
    name: name,
    secondname: secondname,
    middlename: middlename,
    gender: gender,
    dateofbirth: moment(dateofbirth, "DD/MM/YYYY"),
    citizenship: citizenship,
    passportSeries: passportSeries,
    passportNumber: passportNumber,
    pin: pin,
    regions: regions,
    districts: districts,
    address: address,
    telephonenumber: telephonenumber,
    job_title: job_title,
    position: position,
    creatorId: req.user._id,
  });
  const results = await result.save();

  res.status(200).json({
    message: `Employees List`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateEmployees = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const {
    branch,
    photo,
    name,
    secondname,
    middlename,
    gender,
    dateofbirth,
    citizenship,
    passportSeries,
    passportNumber,
    pin,
    regions,
    districts,
    address,
    telephonenumber,
    job_title,
    position,
  } = req.body;

  const result = await findModelById(Employees, AgesId);

  result.branch = branch;
  result.photo = req.file
    ? `${req.filePath}/${req.file.filename}`
    : result.photo;
  result.name = name;
  result.secondname = secondname;
  result.middlename = middlename;
  result.gender = gender;
  result.dateofbirth = moment(dateofbirth, "DD/MM/YYYY");
  result.citizenship = citizenship;
  result.passportSeries = passportSeries;
  result.passportNumber = passportNumber;
  result.pin = pin;
  result.regions = regions;
  result.districts = districts;
  result.address = address;
  result.telephonenumber = telephonenumber;
  result.job_title = job_title;
  result.position = position;

  const data = await result.save();

  res.status(200).json({
    message: "Employees List updated",
    data,
  });
});

exports.deleteEmployeess = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Employees, AgesId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("Bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Employees.findByIdAndRemove(AgesId);

  await User.deleteMany({ agent_Id: AgesId });

  res.status(200).json({
    message: "Employees is deletes",
    data: data,
  });
});

exports.uploadPhoto = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Employees, AgesId);

  result.photo = `${req.filePath}/${req.file.filename}`;

  await result.save();

  res.status(200).json({
    message: "Employees is deletes",
    data: result,
  });
});
