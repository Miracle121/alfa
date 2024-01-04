const asyncHandler = require("express-async-handler");
const Region = require("../models/regions");
const District = require("../models/districts");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getRegions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getRegionsById = asyncHandler(async (req, res, next) => {
  const regId = req.params.id;

  const region = await findModelById(Region, regId, {
    path: "disticts",
  });

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: region,
  });
});

exports.createRegions = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;

  const reg = new Region({
    name: name,
    creatorId: req.user._id,
  });

  const region = await reg.save();

  res.status(201).json({
    message: `ma'lumotlar kiritildi`,
    data: region,
    creatorId: req.user._id,
  });
});

exports.updateRegions = asyncHandler(async (req, res, next) => {
  const regId = req.params.id;
  const name = req.body.name;

  const region = await findModelById(Region, regId);

  region.name = name;

  const data = await region.save();

  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.deleteRegions = asyncHandler(async (req, res, next) => {
  const regId = req.params.id;

  // Find and verify the region
  const regionToDelete = await findModelById(Region, regId);

  // Check if the user has permission to delete
  if (regionToDelete.creatorId.toString() !== req.user._id) {
    return res.status(403).json({
      message: "You don't have permission to delete this region",
      data: null,
    });
  }

  // Remove the region
  const deletedRegion = await Region.findByIdAndRemove(regId);

  // Find and delete associated districts
  const districtList = await District.find({ regiId: regId });

  const deletedDistricts = await District.deleteMany({
    _id: { $in: districtList },
  });

  res.status(200).json({
    message: "Region and associated districts deleted successfully",
    data: {
      deletedRegion,
      deletedDistricts,
    },
  });
});
