const asyncHandler = require("express-async-handler");
const Clients = require("../../models/clients/clients");
const Agents = require("../../models/agents");
const { findModelById } = require("../../util/findModelById");
const { ErrorResponse } = require("../../util/errorResponse");

exports.getClients = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getClientsById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  // Populate options
  const populateOptions = [
    { path: "branch", select: "branchname" },
    { path: "typeofpersons", select: "name" },
    {
      path: "forindividualsdata",
      populate: [{ path: "gender", select: "name" }],
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
  ];

  const result = await findModelById(Clients, AgesId, populateOptions);

  res.status(200).json({
    message: `Clients List`,
    data: result,
  });
});

exports.createClients = asyncHandler(async (req, res, next) => {
  const {
    inn,
    branch,
    typeofpersons,
    forindividualsdata,
    corporateentitiesdata,
    isUsedourpanel,
    isUserRestAPI,
  } = req.body;

  const existingClient = await Clients.findOne({ inn });

  if (existingClient) {
    return res.status(200).json({
      message: "Client already exists",
      data: existingClient,
      creatorId: req.user._id,
    });
  }

  const newClient = await Clients.create({
    inn,
    branch,
    typeofpersons,
    forindividualsdata,
    corporateentitiesdata,
    isUsedourpanel,
    isUserRestAPI,
    creatorId: req.user._id,
  });

  const savedClient = await newClient.save();

  res.status(201).json({
    message: "Client created successfully",
    data: savedClient,
    creatorId: req.user._id,
  });
});

exports.updateClients = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const {
    inn,
    branch,
    typeofpersons,
    forindividualsdata,
    corporateentitiesdata,
    isUsedourpanel,
    isUserRestAPI,
  } = req.body;

  const result = await findModelById(Clients, AgesId);

  result.inn = inn;
  result.branch = branch;
  result.typeofpersons = typeofpersons;
  result.forindividualsdata = forindividualsdata;
  result.corporateentitiesdata = corporateentitiesdata;
  result.isUsedourpanel = isUsedourpanel;
  result.isUserRestAPI = isUserRestAPI;

  const updatedClient = await result.save();

  res.status(200).json({
    message: "Client updated successfully",
    data: updatedClient,
  });
});

exports.deleteClients = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Clients, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new Error("bu userni ochirishga imkoni yoq");
    error.statusCode = 403;
    throw error;
  }

  const data = await Clients.findByIdAndDelete(AgesId);

  await User.deleteMany({ agent_Id: AgesId });

  res.status(200).json({
    message: "Clients is deletes",
    data,
  });
});

exports.getClientsByInn = asyncHandler(async (req, res, next) => {
  const inn = req.get("inn");

  // Populate options
  const populateOptions = [
    { path: "branch", select: "branchname" },
    { path: "typeofpersons", select: "name" },
    {
      path: "forindividualsdata",
      populate: [{ path: "gender", select: "name" }],
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
  ];

  const clients = await Clients.find({ inn }).populate(populateOptions);

  const agents = await Agents.find({ inn }).populate(populateOptions);

  if (!agents && !clients) {
    const error = new ErrorResponse("Object  not found", 404);
    throw error;
  }

  res.status(200).json({
    message: `Clients List`,
    clients: clients,
    agents: agents,
  });
});
