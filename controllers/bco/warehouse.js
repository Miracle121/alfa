const asyncHandler = require("express-async-handler");
const Warehouse = require("../../models/bco/warehouse");
const Typeofbco = require("../../models/bco/typeofbco");
const Policyblank = require("../../models/bco/policyblank");
const { findModelById } = require("../../util/findModelById");
const { ErrorResponse } = require("../../util/errorResponse");

exports.getWarehouse = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getWarehouseById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const populate = [
    { path: "statusofpolicy", select: "name" },
    { path: "branch_id", select: "branchname" },
    {
      path: "policy_type_id",
      populate: [
        { path: "policy_size_id", select: "name" },
        { path: "language", select: "name" },
      ],
    },
  ];

  const result = await findModelById(Warehouse, AgesId, populate);

  res.status(200).json({
    message: `Warehouse Insurance`,
    data: result,
  });
});

exports.createWarehouse = asyncHandler(async (req, res, next) => {
  const {
    policy_type_id,
    policy_number_of_digits_start,
    policy_number_of_digits_end,
  } = req.body;

  const policy_count =
    Math.abs(policy_number_of_digits_start - policy_number_of_digits_end) + 1;

  const statusofpolicy = "63a1f3f370bcecacc39fc2ed";
  const branch_id = "62dfd0f1a098c2cd901d7f6a";

  const result = new Warehouse({
    policy_type_id,
    policy_number_of_digits_start,
    policy_number_of_digits_end,
    policy_count,
    statusofpolicy,
    branch_id,
    creatorId: req.user._id.toString(),
  });

  const status_blank = "63a1f3f370bcecacc39fc2ed";

  const policy_blank_number = await gettingNumberOfDigits(
    result._id,
    policy_type_id,
    policy_number_of_digits_start,
    policy_number_of_digits_end,
    branch_id,
    status_blank,
    req.user._id
  );

  const policyblank = await Policyblank.insertMany(policy_blank_number);

  res.status(200).json({
    message: "Create new policy blank",
    data: result,
    blank: policyblank,
    creatorId: req.user._id,
  });
});

exports.updateWarehouse = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const {
    policy_type_id,
    policy_number_of_digits_start,
    policy_number_of_digits_end,
    statusofpolicy,
  } = req.body;

  const policy_count = Math.abs(
    policy_number_of_digits_start - policy_number_of_digits_end
  );

  await findModelById(Warehouse, AgesId);

  const result = await Warehouse.findByIdAndUpdate(
    AgesId,
    {
      policy_type_id,
      policy_number_of_digits_start,
      policy_number_of_digits_end,
      policy_count,
      statusofpolicy,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    message: "Update policy blank",
    data: result,
  });
});

exports.deleteWarehouse = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Warehouse, AgesId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Warehouse.findByIdAndRemove(AgesId);

  res.status(200).json({
    message: "Policy blank is deleted",
    data: data,
  });
});

exports.getPolicyblanknumberByTypeId = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await Warehouse.find({ policy_type_id: AgesId })
    .populate("policy_type_id", "name")
    .populate("statusofpolicy", "name");

  res.status(200).json({
    message: `Warehouse Insurance`,
    data: result,
  });
});

const gettingNumberOfDigits = async (
  warehouse_id,
  policy_type_id,
  policy_number_of_digits_start,
  policy_number_of_digits_end,
  branch_id,
  status_blank,
  creatorId
) => {
  try {
    const typebco = await Typeofbco.findById(policy_type_id);
    const policynumerdigits = typebco.policy_number_of_digits;

    const numerofpolicy_blank = [];

    for (
      let i = policy_number_of_digits_start;
      i <= policy_number_of_digits_end;
      i++
    ) {
      const testobject = {
        warehous_id: warehouse_id,
        branch_id: branch_id,
        policy_type_id: policy_type_id,
        blank_number: await addZero(policynumerdigits, i),
        Is_usedblank: false,
        status_blank: status_blank,
        Is_given: false,
        creatorId: creatorId,
      };

      numerofpolicy_blank.push(testobject);
    }

    return numerofpolicy_blank;
  } catch (error) {
    console.error("Error in gettingNumberOfDigits:", error);
    throw error; // Rethrow the error or handle it as needed.
  }
};

const addZero = async (policy_count, numer) => {
  try {
    const numerLength = numer.toString();
    const zerosCount = policy_count - numerLength.length;
    const zerosRep = "0".repeat(zerosCount) + numer;
    return zerosRep;
  } catch (error) {
    console.error("Error in addZero:", error);
    throw error; // Rethrow the error or handle it as needed.
  }
};
