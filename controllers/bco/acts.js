const moment = require("moment");
const asyncHandler = require("express-async-handler");
const Acts = require("../../models/bco/acts");
const Warehouse = require("../../models/bco/warehouse");
const Typeofbco = require("../../models/bco/typeofbco");
const Bco = require("../../models/bco/bco");
const Policyblank = require("../../models/bco/policyblank");
const { findModelById } = require("../../util/findModelById");
const { ErrorResponse } = require("../../util/errorResponse");

exports.getActs = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getActsById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  // const result = await Acts.findById(AgesId);
  // // .populate('sender_branch_id', 'name')
  // // .populate('sender_employee_id', 'name')
  // // .populate('statusofbcopolicy', 'name')
  // // .populate('employee_id', 'name')
  // if (!result) {
  //   const error = new Error("Object  not found");
  //   error.statusCode = 404;
  //   throw error;
  // }
  const result = await findModelById(Acts, AgesId);

  res.status(200).json({
    message: `Type of Acts`,
    data: result,
  });
});
exports.createActs = asyncHandler(async (req, res, next) => {
  const {
    act_number,
    act_date,
    sender_branch_id,
    sender_employee_id,
    receiver_branch_id,
    receiver_employee_id,
    bco_data,
    statusofact,
  } = req.body;

  const parsedActDate = moment(act_date, "DD/MM/YYYY");
  const bco = await gettingNumberOfDigits(bco_data);

  const newAct = new Acts({
    act_number,
    act_date: parsedActDate,
    sender_branch_id,
    sender_employee_id,
    receiver_branch_id,
    receiver_employee_id,
    bco_data: bco,
    statusofact,
    creatorId: req.user._id,
  });

  const savedAct = await newAct.save();

  const bcoDataFromFunc = await gettingNumberOfDigitsWithActs(
    bco_data,
    savedAct._id,
    req.userId
  );

  const savedBco = await Bco.insertMany(bcoDataFromFunc);

  res.status(200).json({
    message: "Type of Acts added",
    data: savedAct,
    creatorId: req.user._id,
  });
});

exports.updateActs = asyncHandler(async (req, res, next) => {
  const ActsId = req.params.id;

  const {
    act_number,
    act_date,
    sender_branch_id,
    sender_employee_id,
    receiver_branch_id,
    receiver_employee_id,
    policy_type_id,
    policyId,
  } = req.body;

  let act = await findModelById(Acts, ActsId);

  // Update the fields
  act.act_number = act_number;
  act.act_date = act_date;
  act.sender_branch_id = sender_branch_id;
  act.sender_employee_id = sender_employee_id;
  act.receiver_branch_id = receiver_branch_id;
  act.receiver_employee_id = receiver_employee_id;
  act.policy_type_id = policy_type_id;
  act.policyId = policyId;

  // Save the updated data
  const updatedAct = await act.save();

  res.status(200).json({
    message: "Type of Acts changed",
    data: updatedAct,
  });
});
exports.deleteActs = asyncHandler(async (req, res, next) => {
  const ActsId = req.params.id;

  const deletedData = await findModelById(Acts, ActsId);

  // Check if the user has permission to delete
  if (deletedData.creatorId.toString() !== req.userId) {
    throw new ErrorResponse(
      "You do not have permission to delete this object",
      403
    );
  }

  // Remove the object
  const data = await Acts.findByIdAndRemove(ActsId);

  res.status(200).json({
    message: "Type of Acts is deleted",
    data: data,
  });
});

exports.checkBlanks = asyncHandler(async (req, res, next) => {
  const { policy_type_id, policy_blank_number_from, policy_blank_number_to } =
    req.body;

  const policyBlanks = await Policyblank.find({
    policy_type_id: policy_type_id,
    blank_number: {
      $gte: policy_blank_number_from,
      $lte: policy_blank_number_to,
    },
    Is_usedblank: false,
  });

  const typeofbco = await Typeofbco.findById(policy_type_id);

  const blankNumbers = policyBlanks.map((b) => b.blank_number);

  const blanks = {
    policy_type_id: typeofbco,
    policy_blank_number_from: policy_blank_number_from,
    policy_blank_number_to: policy_blank_number_to,
    blank_counts: blankNumbers.length,
    blanks: blankNumbers,
  };

  res.status(200).json({
    message: "Results of checking blanks",
    data: blanks,
    creatorId: req.user._id,
  });
});

const gettingNumberOfDigits = async (bco_data) => {
  const blanks = [];

  for (const {
    policy_type_id,
    policy_blank_number_from,
    policy_blank_number_to,
  } of bco_data) {
    const policyBlanks = await Policyblank.find({
      policy_type_id: policy_type_id,
      blank_number: {
        $gte: policy_blank_number_from,
        $lte: policy_blank_number_to,
      },
      Is_usedblank: false,
    });

    const blankNumbers = policyBlanks.map((b) => b.blank_number);

    const result = {
      policy_type_id,
      policy_blank_number_from,
      policy_blank_number_to,
      blank_number: blankNumbers,
      blank_counts: blankNumbers.length,
    };

    blanks.push(result);
  }

  return blanks;
};

const gettingNumberOfDigitsWithActs = async (bco_data, act_id, creatorId) => {
  const blanks = [];
  const blank_ids = [];

  for (const {
    policy_type_id,
    policy_blank_number_from,
    policy_blank_number_to,
  } of bco_data) {
    const policyBlanks = await Policyblank.find({
      policy_type_id: policy_type_id,
      blank_number: {
        $gte: policy_blank_number_from,
        $lte: policy_blank_number_to,
      },
      Is_usedblank: false,
    });

    const blankNumbers = policyBlanks.map((b) => {
      const {
        _id,
        blank_number,
        branch_id,
        warehous_id,
        Is_usedblank,
        Is_given,
      } = b;
      return {
        _id,
        blank_number,
        branch_id,
        warehous_id,
        Is_usedblank,
        Is_given,
      };
    });

    blanks.push({
      act_id: act_id,
      policy_type_id: policy_type_id,
      policy_blank_number_from: policy_blank_number_from,
      policy_blank_number_to: policy_blank_number_to,
      blank_number: blankNumbers,
      blank_counts: blankNumbers.length,
      status_bco: "6409a29a1ffcc491f7f4c2e5",
      creatorId: creatorId,
    });

    blank_ids.push(...policyBlanks.map((b) => b._id));
  }

  const updateBlanks = await Policyblank.updateMany(
    { _id: { $in: blank_ids } },
    { $set: { Is_given: true } }
  );

  return blanks;
};
