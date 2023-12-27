const asyncHandler = require("express-async-handler");
const reader = require("xlsx");
const moment = require("moment");
const { findModelById } = require("../../util/findModelById");
const { ErrorResponse } = require("../../util/errorResponse");
const Transaction = require("../../models/billing/transactions");

const convertQueryToObject = (reqQuery) => {
  const query = { ...reqQuery };
  const removeFields = ["select", "sort", "page", "limit"];

  removeFields.forEach((param) => delete query[param]);

  let queryStr = JSON.stringify(query);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  return JSON.parse(queryStr);
};

/**
 *  ?branch=5b76sdf767fds64&region=b2342g53232t3
 */
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
  const file = reader.readFile(req.file.path);
  const data = [];

  file.SheetNames.forEach((sheetName) => {
    const sheetData = reader.utils.sheet_to_json(file.Sheets[sheetName]);
    data.push(...sheetData);
  });
  console.log(data);
  const objectDataArray = data.map((values) => ({
    payment_order_number: values["№ п/п"],
    status_of_attachment: values["Действие"] || "Новый",
    payment_order_date: moment(values["Дата п/п"], "DD/MM/YYYY").toDate(),
    sender_name: values["Наименование отправителя"],
    payment_amount: values["Сумма поступления"],
    payment_details: values["Детали платежа"],
    sender_taxpayer_number: values["ИНН отправителя"],
    sender_bank_taxpayer_number: values["ИНН банка отправителя"],
    sender_bank_code: values["МФО банка отправителя"],
    sender_bank_account: values["Р/с отправителя"],
    recipient_bank_taxpayer_number: values["ИНН банка получателя"],
    recipient_bank_code: values["МФО банка получателя"],
    recipient_bank_account: values["Р/с получателя"],
    creatorId: req.user._id,
  }));

  const results = await Transaction.insertMany(objectDataArray);

  res.status(201).json({
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
