const asyncHandler = require("express-async-handler");
const Warehouse = require("../../models/bco/warehouse");
const Typeofbco = require("../../models/bco/typeofbco");
const Policyblank = require("../../models/bco/policyblank");

exports.getWarehouse = asyncHandler(async (req, res, next) => {
  //   const page = req.query.page || 1;
  //   const counts = 20; //req.query.count ||20
  //   let totalItems;
  //
  //     totalItems = await Warehouse.find().countDocuments();
  //     const data = await Warehouse.find()
  //       .populate("statusofpolicy", "name")
  //       .populate("branch_id", "branchname")
  //       .populate({
  //         path: "policy_type_id",
  //         populate: [
  //           {
  //             path: "policy_size_id",
  //             select: "name",
  //           },
  //           {
  //             path: "language",
  //             select: "name",
  //           },
  //         ],
  //       })
  //       .skip((page - 1) * counts)
  //       .limit(counts);
  //     res.status(200).json({
  //       message: `Warehouse Insurance`,
  //       data: data,
  //       totalItems: totalItems,
  //     });
  //   } catch (err) {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   }
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

  const result = await Warehouse.create({
    policy_type_id,
    policy_number_of_digits_start,
    policy_number_of_digits_end,
    policy_count,
    statusofpolicy,
    branch_id,
    creatorId: req.userId,
  });

  const status_blank = "63a1f3f370bcecacc39fc2ed";
  const policy_blank_number = await gettingNumberOfDigits(
    result._id,
    policy_type_id,
    policy_number_of_digits_start,
    policy_number_of_digits_end,
    branch_id,
    status_blank,
    req.userId
  );

  const policyblank = await Policyblank.insertMany(policy_blank_number);

  res.status(200).json({
    message: "Create new policy blank",
    data: result,
    blank: policyblank,
    creatorId: req.userId,
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

  const result = await findModelById(Warehouse, AgesId);

  Object.assign(result, {
    policy_type_id,
    policy_number_of_digits_start,
    policy_number_of_digits_end,
    policy_count,
    statusofpolicy,
  });

  const updatedResult = await result.save();

  res.status(200).json({
    message: "Update policy blank",
    data: updatedResult,
  });
});

exports.deleteWarehouse = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Warehouse, AgesId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new Error("bu userni ochirishga imkoni yoq", 403);
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
};

const addZero = async (policy_count, numer) => {
  const numerLength = numer.toString();
  const zerosCount = policy_count - numerLength.length;
  const zerosRep = "0".repeat(zerosCount) + numer;
  return zerosRep;
};
