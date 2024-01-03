const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const Agents = require("../models/agents");
const Employee = require("../models/employee/employee");
const { findModelById } = require("../util/findModelById");

exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
  const emp_Id = req.body.emp_id; //req.get('emp_id') || null

  const email = req.body.email;
  const password = req.body.password;
  const accountstatus = req.body.accountstatus;
  const accountrole = req.body.accountrole;

  const user = await User.create({
    agent_Id,
    branch_Id,
    emp_Id,
    email,
    password,
    accountstatus,
    accountrole,
    creatorId: req.user._id,
  });

  const users = await user.save();

  if (agent_Id) {
    const agent = await Agents.findByIdAndUpdate(agent_Id, {
      $set: {
        user_id: users._id,
      },
    });
    await agent.save();
  }

  if (emp_Id) {
    const employee = await Employee.findByIdAndUpdate(emp_Id, {
      $set: {
        user_id: users._id,
      },
    });
    await employee.save();
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
  const accountstatus = req.body.accountstatus;
  const accountrole = req.body.accountrole;

  const user = await findModelById(User, userId);

  user.agent_Id = agent_Id;
  user.emp_Id = emp_id;
  user.branch_Id = branch_Id;
  user.email = email;
  user.password = hashpass;
  user.accountstatus = accountstatus;
  user.accountrole = accountrole;

  const data = await user.save();

  res.status(200).json({
    message: "User data updated successfully.",
    data: data,
  });
});

exports.DeleteUsers = asyncHandler(async (req, res, next) => {
  const usersId = req.params.id;

  await findModelById(User, usersId);

  const data = await User.findByIdAndRemove(usersId);

  res.status(200).json({
    message: "Region is deletes",
    data,
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
