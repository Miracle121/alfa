const asyncHandler = require("express-async-handler");
const Agreements = require("../models/agreements");
const User = require("../models/users");
const moment = require("moment");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getAgreements = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getAgreementsById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  // Populate options
  const populateOptions = [
    { path: "branch", select: "inn" },
    { path: "groupofproductsId", select: "name" },
    { path: "subgroupofproductsId", select: "name" },
    { path: "products", select: "productname" },
    { path: "clinets", select: "inn" },
    { path: "beneficiary", select: "inn" },
    { path: "pledgers", select: "inn" },
    { path: "objectofinsurance.typeofobjects", select: "name" },
    { path: "objectofinsurance.objects", select: "name" },
    { path: "objectofinsurance.regionId", select: "name" },
    { path: "objectofinsurance.districtsId", select: "name" },
    { path: "riskId.riskgroup", select: "name" },
    { path: "riskId.risk", select: "name" },
    { path: "riskId.classeId", select: "name" },
    { path: "paymentcurrency", select: "name" },
    { path: "franchise.risk", select: "name" },
    { path: "franchise.typeoffranchise", select: "name" },
    { path: "franchise.baseoffranchise", select: "name" },
    { path: "termination.reason", select: "name" },
    { path: "commission.agents", select: "inn" },
    { path: "policy.policyId", select: "policynumber" },
  ];

  const result = await findModelById(Agreements, AgesId, populateOptions);

  res.status(200).json({
    message: `Agreements List`,
    data: result,
  });
});

exports.createAgreements = asyncHandler(async (req, res, next) => {
  const branchs = await User.findById(req.user._id).select("branch_Id");
  const branch = branchs.branch_Id;
  const agreementsnumber = req.body.agreementsnumber;
  const groupofproductsId = req.body.groupofproductsId;
  const subgroupofproductsId = req.body.subgroupofproductsId;
  const products = req.body.products;
  const startofinsurance = req.body.startofinsurance;
  const endofinsurance = moment(req.body.endofinsurance, "DD/MM/YYYY");
  const clinets = req.body.clinets;
  const beneficiary = req.body.beneficiary;
  const pledgers = req.body.pledgers;
  const riskId = req.body.riskId;
  const objectofinsurance = req.body.objectofinsurance;
  const totalsuminsured = req.body.totalsuminsured;
  const totalinsurancepremium = req.body.totalinsurancepremium;
  const accruedinsurancepremium = req.body.accruedinsurancepremium;
  const paidinsurancepremium = req.body.paidinsurancepremium;
  const paymentcurrency = req.body.paymentcurrency;
  const duplicatefee = req.body.duplicatefee;
  const demonstrablecosts = req.body.demonstrablecosts;
  const premiumpaymentschedule = req.body.premiumpaymentschedule;
  const franchise = req.body.franchise;
  const termination = req.body.termination;
  const commission = req.body.commission;
  const rpm = req.body.rpm;
  const appregistrationnumber = req.body.appregistrationnumber;
  const applicationdate = moment(req.body.applicationdate, "DD/MM/YYYY");
  const whoaccepted = req.body.whoaccepted;
  const copyofdocuments = req.body.copyofdocuments;
  const generalagreement = req.body.generalagreement;
  const numberofcontract = req.body.numberofcontract;
  const agreementdate = moment(req.body.agreementdate, "DD/MM/YYYY");
  const copyofagreement = req.body.copyofagreement;
  const documents = req.body.documents;
  const policy = req.body.policy;

  const result = new Agreements({
    branch: branch,
    agreementsnumber: agreementsnumber,
    groupofproductsId: groupofproductsId,
    subgroupofproductsId: subgroupofproductsId,
    products: products,
    startofinsurance: startofinsurance,
    endofinsurance: endofinsurance,
    clinets: clinets,
    beneficiary: beneficiary,
    pledgers: pledgers,
    objectofinsurance: objectofinsurance,
    riskId: riskId,
    totalsuminsured: totalsuminsured,
    totalinsurancepremium: totalinsurancepremium,
    accruedinsurancepremium: accruedinsurancepremium,
    paidinsurancepremium: paidinsurancepremium,
    paymentcurrency: paymentcurrency,
    duplicatefee: duplicatefee,
    demonstrablecosts: demonstrablecosts,
    premiumpaymentschedule: premiumpaymentschedule,
    franchise: franchise,
    termination: termination,
    commission: commission,
    rpm: rpm,
    appregistrationnumber: appregistrationnumber,
    applicationdate: applicationdate,
    whoaccepted: whoaccepted,
    copyofdocuments: copyofdocuments,
    generalagreement: generalagreement,
    numberofcontract: numberofcontract,
    agreementdate: agreementdate,
    copyofagreement: copyofagreement,
    documents: documents,
    policy: policy,
    creatorId: req.user._id,
  });

  const results = await result.save();

  res.status(200).json({
    message: `Agreement`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateAgreements = asyncHandler(async (req, res, next) => {
  const agreementId = req.params.id;

  const branchs = await User.findById(req.user._id).select("branch_Id");

  const branch = branchs.branch_Id;
  const agreementsnumber = req.body.agreementsnumber;
  const groupofproductsId = req.body.groupofproductsId;
  const subgroupofproductsId = req.body.subgroupofproductsId;
  const products = req.body.products;
  const startofinsurance = req.body.startofinsurance;
  const endofinsurance = req.body.endofinsurance;
  const riskId = req.body.riskId;
  const totalsuminsured = req.body.totalsuminsured;
  const totalinsurancepremium = req.body.totalinsurancepremium;
  const accruedinsurancepremium = req.body.accruedinsurancepremium;
  const paidinsurancepremium = req.body.paidinsurancepremium;
  const paymentcurrency = req.body.paymentcurrency;
  const duplicatefee = req.body.duplicatefee;
  const demonstrablecosts = req.body.demonstrablecosts;
  const premiumpaymentschedule = req.body.premiumpaymentschedule;
  const franchise = req.body.franchise;
  const termination = req.body.termination;
  const commission = req.body.commission;
  const rpm = req.body.rpm;
  const appregistrationnumber = req.body.appregistrationnumber;
  const applicationdate = req.body.applicationdate;
  const whoaccepted = req.body.whoaccepted;
  const copyofdocuments = req.body.copyofdocuments;
  const generalagreement = req.body.generalagreement;
  const numberofcontract = req.body.numberofcontract;
  const agreementdate = moment(req.body.agreementdate, "DD/MM/YYYY");
  const copyofagreement = req.body.copyofagreement;
  const documents = req.body.documents;
  const policy = req.body.policy;

  const result = await findModelById(Agreements, agreementId);

  result.branch = branch;
  result.agreementsnumber = agreementsnumber;
  result.groupofproductsId = groupofproductsId;
  result.subgroupofproductsId = subgroupofproductsId;
  result.products = products;
  result.startofinsurance = startofinsurance;
  result.endofinsurance = endofinsurance;
  result.riskId = riskId;
  result.totalsuminsured = totalsuminsured;
  result.totalinsurancepremium = totalinsurancepremium;
  result.accruedinsurancepremium = accruedinsurancepremium;
  result.paidinsurancepremium = paidinsurancepremium;
  result.paymentcurrency = paymentcurrency;
  result.duplicatefee = duplicatefee;
  result.demonstrablecosts = demonstrablecosts;
  result.premiumpaymentschedule = premiumpaymentschedule;
  result.franchise = franchise;
  result.termination = termination;
  result.commission = commission;
  result.rpm = rpm;
  result.appregistrationnumber = appregistrationnumber;
  result.applicationdate = applicationdate;
  result.whoaccepted = whoaccepted;
  result.copyofdocuments = copyofdocuments;
  result.generalagreement = generalagreement;
  result.numberofcontract = numberofcontract;
  result.agreementdate = agreementdate;
  result.copyofagreement = copyofagreement;
  result.documents = documents;
  result.policy = policy;

  const data = await result.save();

  res.status(200).json({
    message: `Agreements List`,
    data: data,
  });
});

exports.deleteAgreements = asyncHandler(async (req, res, next) => {
  const agreementId = req.params.id;

  const agreement = await findModelById(Agreements, agreementId);

  if (agreement.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse(
      "You don't have permission to delete this agreement",
      403
    );
    throw error;
  }

  // // Delete related user data
  // await User.deleteMany({ agentId: agreementId });

  // Delete the agreement
  const deletedAgreement = await Agreements.findByIdAndRemove(agreementId);

  res.status(200).json({
    message: "Agreement is deleted",
    data: deletedAgreement,
  });
});
