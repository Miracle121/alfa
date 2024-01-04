const asyncHandler = require("express-async-handler");
const Transactionlog = require("../../models/billing/transactionlog");
const { findModelById } = require("../../util/findModelById");

exports.getTransactionlog = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTransactionlogById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await Transactionlog.findById(AgesId).populate(
    "debt_account_obj2_ID"
  );

  res.status(200).json({
    message: `Transaction list`,
    data: result,
  });
});

exports.createTransactionlog = asyncHandler(async (req, res, next) => {
  const {
    typeofdistribute,
    payment_order_number,
    debt_account_ID,
    debt_account_obj1_ID,
    debt_account_obj2_ID,
    debt_account_obj3_ID,
    debt_account_obj4_ID,
    debt_account_obj5_ID,
    cred_account_ID,
    cred_account_obj1_ID,
    cred_account_obj2_ID,
    cred_account_obj3_ID,
    cred_account_obj4_ID,
    cred_account_obj5_ID,
    amount,
    transaction_date,
    description,
    input_date,
  } = req.body;

  const result = await Transactionlog.create({
    typeofdistribute,
    payment_order_number,
    debt_account_ID,
    debt_account_obj1_ID,
    debt_account_obj2_ID,
    debt_account_obj3_ID,
    debt_account_obj4_ID,
    debt_account_obj5_ID,
    cred_account_ID,
    cred_account_obj1_ID,
    cred_account_obj2_ID,
    cred_account_obj3_ID,
    cred_account_obj4_ID,
    cred_account_obj5_ID,
    amount,
    transaction_date,
    description,
    input_date,
    creatorId: req.user._id,
  });

  res.status(201).json({
    message: "Transaction added",
    data: result,
    creatorId: req.user._id,
  });
});

exports.updateTransactionlog = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const {
    typeofdistribute,
    payment_order_number,
    debt_account_ID,
    debt_account_obj1_ID,
    debt_account_obj2_ID,
    debt_account_obj3_ID,
    debt_account_obj4_ID,
    debt_account_obj5_ID,
    cred_account_ID,
    cred_account_obj1_ID,
    cred_account_obj2_ID,
    cred_account_obj3_ID,
    cred_account_obj4_ID,
    cred_account_obj5_ID,
    amount,
    transaction_date,
    description,
    input_date,
  } = req.body;

  const result = await findModelById(Transactionlog, AgesId);

  Object.assign(result, {
    typeofdistribute,
    payment_order_number,
    debt_account_ID,
    debt_account_obj1_ID,
    debt_account_obj2_ID,
    debt_account_obj3_ID,
    debt_account_obj4_ID,
    debt_account_obj5_ID,
    cred_account_ID,
    cred_account_obj1_ID,
    cred_account_obj2_ID,
    cred_account_obj3_ID,
    cred_account_obj4_ID,
    cred_account_obj5_ID,
    amount,
    transaction_date,
    description,
    input_date,
  });

  res.status(200).json({
    message: "Transaction changed",
    data: result,
  });
});

exports.deleteTransactionlog = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Transactionlog, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new Error("bu userni ochirishga imkoni yoq", 403);

    throw error;
  }
  const data = await Transactionlog.findByIdAndRemove(AgesId);

  res.status(200).json({
    message: "Transaction is deleted",
    data,
  });
});

exports.transaction_date = asyncHandler(async (req, res, next) => {
  console.log("keldi");

  const transactionlog_id = req.params.id;
  const typeofdistribute = req.body.typeofdistribute;
  const debt_account_ID = req.body.debt_account_ID;
  const debt_account_obj1_ID = req.body.debt_account_obj1_ID;
  const debt_account_obj2_ID = req.body.debt_account_obj2_ID;
  const debt_account_obj3_ID = req.body.debt_account_obj3_ID;
  const debt_account_obj4_ID = req.body.debt_account_obj4_ID;
  const debt_account_obj5_ID = req.body.debt_account_obj5_ID;
  const cred_account_ID = req.body.cred_account_ID;
  const cred_account_obj1_ID = req.body.cred_account_obj1_ID;
  const cred_account_obj2_ID = req.body.cred_account_obj2_ID;
  const cred_account_obj3_ID = req.body.cred_account_obj3_ID;
  const cred_account_obj4_ID = req.body.cred_account_obj4_ID;
  const cred_account_obj5_ID = req.body.cred_account_obj5_ID;
  const amount = req.body.amount;
  const transaction_date = req.body.transaction_date;
  const description = req.body.description;
  const input_date = req.body.input_date;

  const transactionlog = await Transactionlog.findById(transactionlog_id);
  console.log(transactionlog);
});
