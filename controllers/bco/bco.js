const asyncHandler = require("express-async-handler");
const Bco = require("../../models/bco/bco");
const Bcoinpolicyblank = require("../../models/bco/bcoinpolicyblank");
const Policyblank = require("../../models/bco/policyblank");
const { ErrorResponse } = require("../../util/errorResponse");

exports.getBco = asyncHandler(async (req, res, next) => {
  //   const page = req.query.page || 1;
  //   const counts = 20; //req.query.count ||20
  //   let totalItems;

  //   totalItems = await Bco.find().countDocuments();
  //   const data = await Bco.find()
  //     .populate("policy_type_id", "policy_type_name")
  //     .populate("act_id", "act_number")
  //     // .populate('statusofbcopolicy', 'name')
  //     // .populate('employee_id', 'name')
  //     // .populate('policy_blank_number', 'blank_number')

  //     .skip((page - 1) * counts)
  //     .limit(counts);
  res.status(200).json(res.advencedResults);
});

exports.getBcoById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await Bco.findById(AgesId)
    .populate("policy_type_id", "policy_type_name")
    .populate("branch_id", "name")
    .populate("statusofbcopolicy", "name")
    .populate("employee_id", "name");
  if (!result) {
    const error = new Error("Object  not found");
    error.statusCode = 404;
    throw error;
  }
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
    creatorId: req.userId,
  });

  const results = await result.save();

  const bcodata = await polcybalnkinbco(
    policy_type_id,
    policy_blank_number,
    result._id,
    req.userId
  );

  res.status(200).json({
    message: `Type of BCO added`,
    data: results,
    creatorId: req.userId,
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

  if (deleteddata.creatorId.toString() !== req.userId) {
    throw new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
  }

  const data = await Bco.findByIdAndRemove(AgesId);

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
  try {
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
  } catch (err) {
    console.error(err);
    throw new ErrorResponse(err.message, 500);
  }
};
