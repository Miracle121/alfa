const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const Agents = require("../models/agents");
const Employee = require("../models/employee/employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findModelById } = require("../util/findModelById");
const { config } = require("../config/config");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const page = req.query.page || 1;
  const counts = 20; //req.query.count ||20
  let totalItems;
  totalItems = await User.find().countDocuments();
  const users = await User.find()
    .populate("accountstatus", "name")
    .populate("accountrole", "name")
    .populate("branch_Id", "branchname")
    .populate("agent_Id", "inn")

    .skip((page - 1) * counts)
    .limit(counts);
  res.status(200).json({
    message: `User haqida ma'/lumot`,
    data: users,
    totalItems: totalItems,
  });
});

exports.getUsersById = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const users = await findModelById(User, userId, [
    { path: "accountstatus", select: "name" },
    { path: "accountrole", select: "name" },
    { path: "branch_Id", select: "branchname" },
    { path: "agent_Id", select: "inn" },
  ]);

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    users: users,
  });
});

exports.CreateUsers = asyncHandler(async (req, res, next) => {
  const agent_Id = req.body.agentId || null; //req.get('agentId') || null
  const branch_Id = req.body.branch_Id || null; //req.get('branch_Id')
  const emp_id = req.body.emp_id; //req.get('emp_id') || null

  const email = req.body.email;
  const password = req.body.password;
  const accountstatus = req.body.accountstatus;
  const accountrole = req.body.accountrole;
  const hashpass = await bcrypt.hash(password, 12);
  const user = new User({
    agent_Id: agent_Id,
    branch_Id: branch_Id,
    emp_Id: emp_id,
    email: email,
    password: hashpass,
    accountstatus: accountstatus,
    accountrole: accountrole,
    creatorId: req.user._id,
  });
  const users = await user.save();
  console.log(users);
  if (agent_Id) {
    const agent = await Agents.findByIdAndUpdate(agent_Id, {
      $set: {
        user_id: users._id,
      },
    });
    const agents = await agent.save();
  }
  if (emp_id) {
    const employee = await Employee.findByIdAndUpdate(emp_id, {
      $set: {
        user_id: users._id,
      },
    });
    const emp = await employee.save();
  }
  res.status(201).json({
    message: "User bazaga kiritildi",
    users: users,
  });
});

exports.UpdateUsers = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const agent_Id = req.get("agent_Id") || null;
  const branch_Id = req.get("branch_Id");
  const emp_id = req.get("emp_id") || null;
  const email = req.body.email;
  const password = req.body.password;
  const accountstatus = req.body.accountstatus;
  const accountrole = req.body.accountrole;
  const hashpass = await bcrypt.hash(password, 12);

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("Object  not found");
    error.statusCode = 404;
    throw error;
  }
  user.agent_Id = agent_Id;
  user.emp_Id = emp_id;
  user.branch_Id = branch_Id;
  user.email = email;
  user.password = hashpass;
  user.accountstatus = accountstatus;
  user.accountrole = accountrole;
  const data = await user.save();
  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.DeleteUsers = asyncHandler(async (req, res, next) => {
  const usersId = req.params.id;
  const deleteddata = await User.findById(usersId);

  if (!deleteddata) {
    const error = new Error("Object  not found");
    error.statusCode = 404;
    throw error;
  }

  const data = await User.findByIdAndRemove(usersId);
  res.status(200).json({
    message: "Region is deletes",
    data: data,
  });
});

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await findModelById(User, req.user._id, [
    { path: "accountstatus", select: "name" },
    { path: "accountrole", select: "name" },
    { path: "branch_Id" },
    { path: "agent_Id" },
    { path: "emp_Id", select: "name secondname middlename" },
  ]);

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    user,
  });
});
