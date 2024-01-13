const asyncHandler = require("express-async-handler");
const Agents = require("../models/agents");
const User = require("../models/users");
const Branches = require("../models/branches");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

const populateOptions = [
  { path: "branch", select: "branchname" },
  { path: "typeofpersons", select: "name" },
  { path: "typeofagent", select: "name" },
  {
    path: "forindividualsdata",
    populate: [
      { path: "gender", select: "name" },
      { path: "citizenship", select: "name" },
      { path: "typeofdocument", select: "name" },
      { path: "regions", select: "name" },
      { path: "districts", select: "name" },
    ],
  },
  {
    path: "corporateentitiesdata",
    populate: [
      { path: "region", select: "name" },
      { path: "districts", select: "name" },
      {
        path: "employees",
        populate: [
          { path: "positions", select: "name" },
          { path: "typeofdocumentsformanager", select: "name" },
        ],
      },
    ],
  },
  {
    path: "user_id",
    select: "email branch_Id accountstatus accountrole",
    populate: [
      { path: "branch_Id", select: "branchname" },
      { path: "accountstatus", select: "name" },
      { path: "accountrole", select: "name" },
    ],
  },
];

exports.getAgents = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getAgentsById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Agents, AgesId).populate(populateOptions);

  res.status(200).json({
    message: `Agents List`,
    data: result,
  });
});

exports.createAgents = asyncHandler(async (req, res, next) => {
  const inn = req.body.inn;
  const branch = req.body.branch;
  const agreementnumber = req.body.agreementnumber || null;
  const agreementdate = moment(req.body.agreementdate, "DD/MM/YYYY") || null;
  const typeofpersons = req.body.typeofpersons;
  const isbeneficiary = req.body.isbeneficiary || null;
  const isfixedpolicyholde = req.body.isfixedpolicyholde || null;
  const typeofagent = req.body.typeofagent;
  let forindividualsdata = req.body.forindividualsdata || null;
  let corporateentitiesdata = req.body.corporateentitiesdata || null;
  const isUsedourpanel = req.body.isUsedourpanel;
  const isUserRestAPI = req.body.isUserRestAPI;

  const inn1 = await Agents.find({ inn });
  if (inn1.length === 0) {
    const result = new Agents({
      inn: inn,
      branch: branch,
      agreementnumber: agreementnumber,
      agreementdate: agreementdate,
      typeofpersons: typeofpersons,
      isbeneficiary: isbeneficiary,
      isfixedpolicyholde: isfixedpolicyholde,
      typeofagent: typeofagent,
      forindividualsdata: forindividualsdata,
      corporateentitiesdata: corporateentitiesdata,
      isUsedourpanel: isUsedourpanel,
      isUserRestAPI: isUserRestAPI,

      creatorId: req.user._id,
    });
    const results = await result.save();
    res.status(200).json({
      message: `Agents List`,
      data: results,
      creatorId: req.user._id,
    });
  } else {
    res.status(200).json({
      message: `Agents List`,
      data: inn1,
      creatorId: req.user._id,
    });
  }
});

exports.updateAgents = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const inn = req.body.inn;
  const branch = req.body.branch;
  const agreementnumber = req.body.agreementnumber || null;
  const agreementdate = req.body.agreementdate || null; //moment(req.body.agreementdate,"DD/MM/YYYY")
  const typeofpersons = req.body.typeofpersons;
  const isbeneficiary = req.body.isbeneficiary || null;
  const isfixedpolicyholde = req.body.isfixedpolicyholde || null;
  const typeofagent = req.body.typeofagent;
  let forindividualsdata = req.body.forindividualsdata || null;
  let corporateentitiesdata = req.body.corporateentitiesdata || null;
  const isUsedourpanel = req.body.isUsedourpanel;
  const isUserRestAPI = req.body.isUserRestAPI;

  const result = await findModelById(Agents, AgesId);

  result.inn = inn;
  result.branch = branch;
  result.agreementnumber = agreementnumber;
  result.agreementdate = agreementdate;
  result.typeofpersons = typeofpersons;
  result.isbeneficiary = isbeneficiary;
  result.isfixedpolicyholde = isfixedpolicyholde;
  result.typeofagent = typeofagent;
  result.forindividualsdata = forindividualsdata;
  result.corporateentitiesdata = corporateentitiesdata;
  result.isUsedourpanel = isUsedourpanel;
  result.isUserRestAPI = isUserRestAPI;

  const data = await result.save();
  res.status(200).json({
    message: `Agents List`,
    data: data,
  });
});

exports.deleteAgents = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Agents, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Agents.findByIdAndDelete(AgesId);
  await User.deleteMany({ agentId: AgesId });

  res.status(200).json({
    message: "Agent is deleted",
    data: data,
  });
});

exports.deleteAgents = asyncHandler(async (req, res, next) => {
  const agentId = req.params.id;

  const { deletedAgent, deletedUserData } = await deleteAgentAndRelatedData(
    agentId
  );

  res.status(200).json({
    message: "Agent and related user data deleted successfully",
    data: {
      deletedAgent,
      deletedUserData,
    },
  });
});

exports.getAgentsByBranchId = asyncHandler(async (req, res, next) => {
  const fondId = req.params.id;

  const branch = await Branches.findOne({ fond_id: fondId });

  if (!branch) {
    return res.status(200).json({
      message: `Bunday filial topilmadi`,
      data: [],
    });
  }

  const agents = await Agents.find({ branch }).populate(populateOptions);

  if (!agents || agents.length === 0) {
    return res.status(200).json({
      message: `Agentlar mavjud emas`,
      data: [],
    });
  }

  res.status(200).json({
    message: `Agents List`,
    data: agents,
  });
});

//--------------//
async function deleteAgentAndRelatedData(agentId) {
  // Check if the agent exists
  const agent = await findModelById(Agents, agentId);

  // Check if the current user has the permission to delete the agent
  if (agent.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse(
      "You don't have permission to delete this agent",
      403
    );
    throw error;
  }

  // Find and delete the agent
  const deletedAgent = await Agents.findByIdAndDelete(agentId);

  // Find and delete related user data
  const deletedUserData = await User.deleteMany({ agentId });

  return {
    deletedAgent,
    deletedUserData,
  };
}
