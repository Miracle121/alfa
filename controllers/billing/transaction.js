const path = require("path");
const asyncHandler = require("express-async-handler");
const xlsx = require("xlsx");
const moment = require("moment");
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
  const file = xlsx.readFile(req.file.path);
  const data = [];

  file.SheetNames.forEach((sheetName) => {
    const sheetData = xlsx.utils.sheet_to_json(file.Sheets[sheetName]);
    data.push(...sheetData);
  });

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

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("Bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Transaction.findByIdAndRemove(AgesId);

  res.status(200).json({
    message: "Transaction is deleted",
    data: data,
  });
});

exports.divisionTranactions = asyncHandler(async (req, res, next) => {
  const { transactions } = req.body;

  const populateOpt = [
    {
      path: "client",
      select:
        "forindividualsdata.middlename forindividualsdata.secondname forindividualsdata.name",
    },
    {
      path: "branch",
      select: "branchname",
      populate: [
        { path: "policy", select: "policy_number" },
        { path: "blank" },
      ],
    },
    { path: "region", select: "name" },
    { path: "district", select: "name" },
  ];

  const transactionObject = await Promise.all(
    transactions.map(async (t) => {
      return await findModelById(Transaction, t, populateOpt);
    })
  );

  const data = transactionObject.map((v) => {
    return {
      "№ п/п": v.payment_order_number,
      "Статус прикрепления": v.status_of_attachment,
      "Дата поступления": dateFormat(v.payment_order_date),
      "Наименование отправителя": v.sender_name,
      "Сумма поступления": v.payment_amount,
      "Детали платежа": v.payment_details,
      "ИНН отправителя": v.sender_taxpayer_number,
      "ИНН банка отправителя": v.sender_bank_taxpayer_number,
      "МФО банка отправителя": v.sender_bank_code,
      "Р/с отправителя": v.sender_bank_account,
      "ИНН банка получателя": v.recipient_bank_taxpayer_number,
      "МФО банка получателя": v.recipient_bank_code,
      "Р/с получателя": v.recipient_bank_account,
      Филиал: v.branch.branchname,
      "Номер договора": v.branch.agreementId,
    };
  });

  // Create a new workbook
  const workbook = xlsx.utils.book_new();

  // Add a worksheet
  const worksheet = xlsx.utils.json_to_sheet(data);

  // Set row height for all rows (including headers)
  const rowHeight = 20; // You can adjust this value based on your requirements

  for (let i = 1; i <= data.length + 1; i++) {
    worksheet["!rows"] = worksheet["!rows"] || [];
    worksheet["!rows"][i + 2] = { hpx: rowHeight };
  }

  const columnWidth = 20; // You can adjust this value based on your requirements

  Object.keys(data[0]).forEach((key, index) => {
    worksheet["!cols"] = worksheet["!cols"] || [];
    worksheet["!cols"][index] = { wch: columnWidth };
  });

  // Calculate the sum of 'Сумма поступления' column
  const sumColumn = "Сумма поступления";
  const sumFormula = `SUM(${sumColumn}2:${sumColumn}${data.length + 1})`;
  const sumResult = data.reduce((sum, row) => sum + (row[sumColumn] || 0), 0);

  // Write the sum to a separate cell
  const sumCellRef = xlsx.utils.encode_cell({
    r: data.length + 2,
    c: Object.keys(data[0]).indexOf(sumColumn),
  });
  worksheet[sumCellRef] = { f: sumFormula, t: "n" };
  worksheet[sumCellRef].v = sumResult;

  // Add the worksheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, "Transactions");

  // Generate a unique file name using uuid
  const fileName = `transactions_${Date.now()}.xlsx`;

  // Specify the file path
  const directoryPath = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    "billingfiles"
  );

  // create directory
  // await fs.promises.mkdir(directoryPath);

  const filePath = path.join(directoryPath, fileName);

  // Write the workbook to the file
  xlsx.writeFile(workbook, filePath);

  res.status(201).json({
    message: "File added",
    data: {
      fileName,
    },
    creatorId: req.user._id,
  });
});

function dateFormat(date) {
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString(undefined, options);

  return formattedDate;
}
