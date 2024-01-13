const asyncHandler = require("express-async-handler");
const Policyblank = require("../../models/bco/policyblank");
const { findModelById } = require("../../util/findModelById");
const { ErrorResponse } = require("../../util/errorResponse");

exports.getPolicyblank = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getPolicyblankById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const populate = [
    {
      path: "branch_id",
      populate: [
        {
          path: "policy_type_id",
          select: "name",
        },
        {
          path: "statusofpolicy",
          select: "name",
        },
      ],
    },
    {
      path: "policy_type_id",
      populate: [
        {
          path: "policy_size_id",
          select: "name",
        },
        {
          path: "language",
          select: "name",
        },
      ],
    },
    {
      path: "policy_id",
      populate: [
        {
          path: "agreementsId",
          select: "agreementsnumber",
        },
        {
          path: "typeofpoliceId",
          select: "name",
        },
        {
          path: "statusofpolicy",
          select: "name",
        },
        {
          path: "statusofpayment",
          select: "name",
        },
      ],
    },
  ];

  const result = await findModelById(Policyblank, AgesId, populate);

  res.status(200).json({
    message: `Warehouse Insurance`,
    data: result,
  });
});

exports.createPolicyblank = asyncHandler(async (req, res, next) => {
  const { branch_id, policy_type_id, blank_number, Is_usedblank } = req.body;

  const result = await Policyblank.create({
    branch_id,
    policy_type_id,
    blank_number,
    Is_usedblank,
    creatorId: req.user._id,
  });

  const results = await result.save();

  res.status(201).json({
    message: `Creat new policy blank`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updatePolicyblank = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const { warehouse_id, policy_type_id, blank_number, Is_usedblank } = req.body;

  const result = await findModelById(Policyblank, AgesId);

  Object.assign(result, {
    warehouse_id,
    policy_type_id,
    blank_number,
    Is_usedblank,
  });

  const data = await result.save();

  res.status(200).json({
    message: `Update policy blank`,
    data: data,
  });
});

exports.deletePolicyblank = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Policyblank, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("Bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Policyblank.findByIdAndDelete(AgesId);

  res.status(200).json({
    message: "Policy blank is deleted",
    data: data,
  });
});

exports.getPolicyblanknumberByTypeId = asyncHandler(async (req, res, next) => {
  const policy_type_id = req.params.id;

  const result = await Policyblank.find(
    { policy_type_id } && { Is_usedblank: false }
  ).select("blank_number");
  // .populate({
  //     path:'warehouse_id',
  //     populate:[
  //         {
  //             path: 'policy_type_id',
  //             select: 'name'
  //         },
  //         {
  //             path: 'statusofpolicy',
  //             select: 'name'
  //         }
  //     ]
  // })
  //  .populate({
  //     path: 'policy_type_id',
  //     populate:[
  //         {
  //         path: 'policy_size_id',
  //         select: 'name'
  //     },
  //     {
  //         path: 'language',
  //         select: 'name'

  //     }
  //     ]
  //  })

  if (!result) {
    const error = new ErrorResponse("Object  not found", 403);
    throw error;
  }

  res.status(200).json({
    message: `Policy blank by type of bco`,
    data: result,
  });
});
