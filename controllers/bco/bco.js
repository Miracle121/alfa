const asyncHandler = require("express-async-handler");
const Bco = require("../../models/bco/bco");
const Bcoinpolicyblank = require("../../models/bco/bcoinpolicyblank");
const Policyblank = require("../../models/bco/policyblank");
const { ErrorResponse } = require("../../util/errorResponse");
const { findModelById } = require("../../util/findModelById");

exports.getBco = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getBcoById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Bco, AgesId, [
    { path: "policy_type_id", select: "policy_type_name" },
    // { path: "branch_id", select: "name" },
    // { path: "statusofbcopolicy", select: "name" },
    // { path: "employee_id", select: "name" },
  ]);

  res.status(200).json({
    message: `Type of BCO`,
    data: result,
  });
});

exports.createBco = asyncHandler(async (req, res, next) => {
  const {
    policy_type_id,
    policy_blank_number,
    branch_id,
    employee_id,
    statusofbcopolicy,
  } = req.body;

  const result = new Bco({
    policy_type_id,
    policy_blank_number,
    branch_id,
    employee_id,
    statusofbcopolicy,
    creatorId: req.user._id,
  });

  const results = await result.save();

  const bcodata = await polcybalnkinbco(
    policy_type_id,
    policy_blank_number,
    result._id,
    req.user._id
  );

  res.status(200).json({
    message: `Type of BCO added`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateBco = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const {
    policy_type_id,
    policy_series,
    policy_blank_number,
    policy_qr_code,
    branch_id,
    employee_id,
    statusofbcopolicy,
  } = req.body;

  const result = await findModelById(Bco, AgesId);

  Object.assign(result, {
    policy_type_id,
    policy_series,
    policy_blank_number,
    policy_qr_code,
    branch_id,
    employee_id,
    statusofbcopolicy,
  });

  const data = await result.save();

  res.status(200).json({
    message: `Type of BCO changed`,
    data: data,
  });
});

exports.deleteBco = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Bco, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    throw new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
  }

  const data = await Bco.findByIdAndDelete(AgesId);

  res.status(200).json({
    message: "Type of BCO is deleted",
    data: data,
  });
});

const polcybalnkinbco = async (
  policy_type_id,
  policy_blank_numbers,
  bco_id,
  creatorId
) => {
  const data_bco = policy_blank_numbers.map((policy_blank_number, index) => ({
    policy_type_id,
    bco_id,
    policy_blank_number,
    policy_qr_code: `xxxxx${index}`,
    creatorId,
  }));

  await Bcoinpolicyblank.insertMany(data_bco);

  await Policyblank.updateMany(
    {
      _id: { $in: policy_blank_numbers },
    },
    {
      $set: {
        Is_usedblank: true,
      },
    }
  );
};
