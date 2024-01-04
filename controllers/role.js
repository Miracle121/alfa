const asyncHandler = require("express-async-handler");
const Role = require("../models/role");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getRole = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getRoleId = asyncHandler(async (req, res, next) => {
  const roleId = req.params.id;

  const roles = await findModelById(Role, roleId);

  res.status(200).json({
    message: `Roles list`,
    data: roles,
  });
});

exports.createRole = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;

  const group = new Role({
    name: name,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `Role addes`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateRole = asyncHandler(async (req, res, next) => {
  const groupsId = req.params.id;
  const name = req.body.name;

  const groups = await findModelById(Role, groupsId);

  groups.name = name;

  const groupsofpr = await groups.save();

  res.status(200).json({
    message: `Role is changed`,
    data: groupsofpr,
  });
});

exports.deleteRole = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const deleteddata = await findModelById(Role, subgroupsId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Role.findByIdAndRemove(subgroupsId);

  res.status(200).json({
    message: "Role deleted",
    data: data,
  });
});
