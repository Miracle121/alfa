const asyncHandler = require("express-async-handler");
const reader = require("xlsx");
const { findModelById } = require("../../util/findModelById");
const { ErrorResponse } = require("../../util/errorResponse");
const Transaction = require("../../models/billing/transactions");

exports.getTransaction = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTransactionById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const result = await findModelById(AgesId);

  res.status(200).json({
    message: `Transaction list`,
    data: result,
  });
});

exports.createTransaction = asyncHandler(async (req, res, next) => {
  const file = reader.readFile(req.file.path); //"C:/Users/Mrxone/Desktop/123.xlsx"
  const data = [];

  file.SheetNames.forEach((sheetName) => {
    const sheetData = XLSX.utils.sheet_to_json(file.Sheets[sheetName]);
    data.push(...sheetData);
  });

  const objectDataArray = data.map((values) => ({
    payment_order_number: values["транзакция номера"],
    payment_order_date: values["дата транзакции"],
    payment_amount: values["Сумма поступления"],
    payment_details: values["Детали платежа"],
    sender_name: values["Наименование отправителя"],
    sender_taxpayer_number: values["ИНН отправителя"],
    sender_bank_account: values["р/с отправителя"],
    sender_bank_code: values["МФО отправителя"],
    sender_bank_taxpayer_number: values["ИНН банка отправителя"],
    recipient_bank_account: values["р/с получателя"],
    recipient_bank_code: values["МФО получателя"],
    recipient_bank_taxpayer_number: values["ИНН банка получателя"],
    creatorId: req.user._id,
  }));

  const results = await Transaction.insertMany(objectDataArray, {
    ordered: false,
  });

  res.status(200).json({
    message: "File added",
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateTransaction = asyncHandler(async (req, res, next) => {
  const agesId = req.params.id;
  const {
    payment_order_number,
    payment_order_date,
    payment_amount,
    payment_details,
    sender_name,
    sender_taxpayer_number,
    sender_bank_account,
    sender_bank_code,
    sender_bank_taxpayer_number,
    recipient_bank_account,
    recipient_bank_code,
    recipient_bank_taxpayer_number,
  } = req.body;

  const result = await findModelById(Transaction, agesId);

  // Assign the updated values directly
  Object.assign(result, {
    payment_order_number,
    payment_order_date,
    payment_amount,
    payment_details,
    sender_name,
    sender_taxpayer_number,
    sender_bank_account,
    sender_bank_code,
    sender_bank_taxpayer_number,
    recipient_bank_account,
    recipient_bank_code,
    recipient_bank_taxpayer_number,
  });

  const data = await result.save();

  res.status(200).json({
    message: "Transaction changed",
    data,
  });
});

exports.deleteTransaction = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Transaction, AgesId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("Bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Transaction.findByIdAndRemove(AgesId);

  res.status(200).json({
    message: "Transaction is deleted",
    data: data,
  });
});
