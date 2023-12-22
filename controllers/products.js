const asyncHandler = require("express-async-handler");
const Products = require("../models/products");
const Agents = require("../models/agents");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getProducts = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

exports.getProductsId = async (req, res, next) => {
  const riskId = req.params.id;

  const populateOptions = [
    { path: "groupofproductsId", select: "name" },
    { path: "subgroupofproductsId", select: "name" },
    { path: "typeofbco_Id", select: "policy_type_name" },
    { path: "typeofsectorId", select: "name" },
    { path: "typeofinsurerId", select: "name" },
    { path: "statusofproducts", select: "name" },
    { path: "riskId.riskgroup", select: "name" },
    { path: "riskId.risk", select: "name" },
    { path: "riskId.classeId", select: "name" },
    { path: "applicationformId", select: "name" },
    { path: "additionaldocuments", select: "name" },
    { path: "fixedpolicyholder", select: "inn" },
    { path: "fixedbeneficiary", select: "fullName" },
    { path: "policyformatId", select: "name" },
    { path: "typeofclaimsettlement", select: "name" },
    { path: "typeofrefund", select: "name" },
    { path: "typeofrefund", select: "name" },
    { path: "typeofpayment", select: "name" },
    { path: "typeofpolice", select: "name" },
    // { path: 'agentlist', select: 'fullName' },
    // { path: 'tariffperclasses.classes', select: 'name' },
    { path: "franchise.risk", select: "name" },
    { path: "franchise.typeoffranchise", select: "name" },
    { path: "franchise.baseoffranchise", select: "name" },
    {
      path: "tariff",
      populate: [
        { path: "agentlist", select: "inn" },
        {
          path: "tariffperclasses",
          populate: [{ path: "classes", select: "name" }],
        },
      ],
    },
  ];

  const data = await findModelById(Products, riskId).populate(populateOptions);

  res.status(200).json({
    message: `Products list`,
    data,
  });
};

exports.createProducts = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const {
    productname,
    codeproduct,
    versionproduct,
    groupofproductsId,
    subgroupofproductsId,
    typeofbco,
    typeofsectorId,
    isrequirepermission,
    typeofpersones,
    typeofinsurerId,
    statusofproducts,
    riskId,
    isapplicationform,
    applicationformId,
    iscontractform,
    contractform,
    Isadditionaldocuments,
    additionaldocuments,
    Isfixedpolicyholder,
    fixedpolicyholder,
    Isbeneficiary,
    Isfixedbeneficiary,
    fixedbeneficiary,
    Isfixedpremium,
    fixedpremium,
    Isbettingrange,
    Isfixedrate,
    fixedrate,
    Isfixedsuminsured,
    fixedsuminsured,
    Isfixedfee,
    fixedfee,
    Isfixedpreventivemeasures,
    fixedpreventivemeasures,
    Ispolicywithoutpayment,
    Ismultipleagents,
    Isfranchisechange,
    Isforeigncurrency,
    policyformatId,
    typeofclaimsettlement,
    typeofrefund,
    typeofpayment,
    typeofpolice,
    minimumterminsurance,
    maxterminsurance,
    tariff,
    franchise,
  } = req.body;

  // Create a new product
  const product = new Products({
    productname,
    codeproduct,
    versionproduct,
    groupofproductsId,
    subgroupofproductsId,
    typeofbco_Id: typeofbco,
    typeofsectorId,
    typeofpersones,
    isrequirepermission,
    typeofinsurerId,
    statusofproducts,
    riskId,
    isapplicationform,
    applicationformId,
    iscontractform,
    contractform,
    Isadditionaldocuments,
    additionaldocuments,
    Isfixedpolicyholder,
    fixedpolicyholder,
    Isbeneficiary,
    Isfixedbeneficiary,
    fixedbeneficiary,
    Isfixedpremium,
    fixedpremium,
    Isbettingrange,
    Isfixedrate,
    fixedrate,
    Isfixedsuminsured,
    fixedsuminsured,
    Isfixedfee,
    fixedfee,
    Isfixedpreventivemeasures,
    fixedpreventivemeasures,
    Ispolicywithoutpayment,
    Ismultipleagents,
    Isfranchisechange,
    Isforeigncurrency,
    policyformatId,
    typeofclaimsettlement,
    typeofrefund,
    typeofpayment,
    typeofpolice,
    minimumterminsurance,
    maxterminsurance,
    tariff,
    franchise,
    creatorId: req.user._id,
  });
  const result = await product.save();

  //============================qayta korish uchun agentni update qilish joyi fixedpolicyholder  fixedbeneficiary================

  // Update fixed policyholder and fixed beneficiary
  const updateAgent = async (agentId, isFixedValue) => {
    const agentData = await Agents.findById(agentId);
    if (agentData) {
      agentData.isfixedpolicyholde = isFixedValue;
      return await agentData.save();
    }
  };

  await updateAgent(fixedpolicyholder, fixedpolicyholder);
  await updateAgent(fixedbeneficiary, fixedbeneficiary);

  //============================================================

  res.status(201).json({
    message: `Products added`,
    data: result,
    creatorId: req.user._id,
  });
});

exports.updateProducts = async (req, res, next) => {
  const productId = req.params.id;

  const {
    productname,
    codeproduct,
    versionproduct,
    groupofproductsId,
    subgroupofproductsId,
    typeofbco,
    typeofsectorId,
    isrequirepermission,
    typeofpersones,
    typeofinsurerId,
    statusofproducts,
    riskId,
    isapplicationform,
    applicationformId,
    iscontractform,
    contractform,
    Isadditionaldocuments,
    additionaldocuments,
    Isfixedpolicyholder,
    fixedpolicyholder,
    Isbeneficiary,
    Isfixedbeneficiary,
    fixedbeneficiary,
    Isfixedpremium,
    fixedpremium,
    Isbettingrange,
    Isfixedrate,
    fixedrate,
    Isfixedsuminsured,
    fixedsuminsured,
    Isfixedfee,
    fixedfee,
    Isfixedpreventivemeasures,
    fixedpreventivemeasures,
    Ispolicywithoutpayment,
    Ismultipleagents,
    Isfranchisechange,
    Isforeigncurrency,
    policyformatId,
    typeofclaimsettlement,
    typeofrefund,
    typeofpayment,
    typeofpolice,
    minimumterminsurance,
    maxterminsurance,
    tariff,
    franchise,
  } = req.body;

  // const agentlist= req.body.agentlist
  // const Isagreement= req.body.Isagreement
  // const limitofagreement= req.body.limitofagreement
  // const tariffperclasses= req.body.tariffperclasses

  const products = await findModelById(Products, productId);

  products.productname = productname;
  products.codeproduct = codeproduct;
  products.versionproduct = versionproduct;
  products.groupofproductsId = groupofproductsId;
  products.subgroupofproductsId = subgroupofproductsId;
  products.typeofbco_Id = typeofbco;
  products.typeofsectorId = typeofsectorId;
  products.typeofpersones = typeofpersones;
  products.isrequirepermission = isrequirepermission;
  products.typeofinsurerId = typeofinsurerId;
  products.statusofproducts = statusofproducts;
  products.riskId = riskId;
  products.isapplicationform = isapplicationform;
  products.applicationformId = applicationformId;
  products.iscontractform = iscontractform;
  products.contractform = contractform;
  products.Isadditionaldocuments = Isadditionaldocuments;
  products.additionaldocuments = additionaldocuments;
  products.Isfixedpolicyholder = Isfixedpolicyholder;
  products.fixedpolicyholder = fixedpolicyholder;
  products.Isbeneficiary = Isbeneficiary;
  products.Isfixedbeneficiary = Isfixedbeneficiary;
  products.fixedbeneficiary = fixedbeneficiary;
  products.Isfixedpremium = Isfixedpremium;
  products.fixedpremium = fixedpremium;
  products.Isbettingrange = Isbettingrange;
  products.Isfixedrate = Isfixedrate;
  products.fixedrate = fixedrate;
  products.Isfixedsuminsured = Isfixedsuminsured;

  products.Isfixedfee = Isfixedfee;
  products.fixedsuminsured = fixedsuminsured;
  products.fixedfee = fixedfee;
  products.Isfixedpreventivemeasures = Isfixedpreventivemeasures;
  products.fixedpreventivemeasures = fixedpreventivemeasures;

  products.Ispolicywithoutpayment = Ispolicywithoutpayment;
  products.Ismultipleagents = Ismultipleagents;
  products.Isfranchisechange = Isfranchisechange;
  products.Isforeigncurrency = Isforeigncurrency;
  products.policyformatId = policyformatId;
  products.typeofclaimsettlement = typeofclaimsettlement;
  products.typeofrefund = typeofrefund;
  products.typeofpayment = typeofpayment;
  products.typeofpolice = typeofpolice;
  products.minimumterminsurance = minimumterminsurance;
  products.maxterminsurance = maxterminsurance;

  products.tariff = tariff;
  products.franchise = franchise;
  // products.agentlist=agentlist
  // products.Isagreement=Isagreement
  // products.limitofagreement=limitofagreement
  // products.tariffperclasses=tariffperclasses

  const data = await products.save();

  res.status(200).json({
    message: `Products is changed`,
    data,
  });
};

exports.deleteProducts = async (req, res, next) => {
  const typeofrisksId = req.params.id;

  const deleteddata = await findModelById(Products, typeofrisksId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Products.findByIdAndRemove(typeofrisksId);

  res.status(200).json({
    message: "Products is deleted",
    data: data,
  });
};
