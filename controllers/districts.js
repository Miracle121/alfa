const asyncHandler = require("express-async-handler");
const District = require("../models/districts");
const Region = require("../models/regions");
const { findModelById } = require("../util/findModelById");

exports.getDistricts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getDistrictsById = asyncHandler(async (req, res, next) => {
  const region = req.params.id;

  const dist = await findModelById(District, region, ("region", "name"));

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: dist,
  });
});

exports.getDistrictsByregion = asyncHandler(async (req, res, next) => {
  const region = req.params.id;

  const dist = await District.find({ region: region }).populate({
    path: "region",
    select: "name",
    match: { _id: region },
  });

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: dist,
  });
});

exports.createDistricts = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const region = req.body.region;

  const dist = new District({
    name,
    region,
    creatorId: req.user._id,
  });

  const districts = await dist.save();

  res.status(200).json({
    message: `ma'lumotlar kiritildi`,
    data: districts,
    creatorId: req.user._id,
  });
});

exports.updateDistricts = asyncHandler(async (req, res, next) => {
  const distId = req.params.id;
  const name = req.body.name;
  const region = req.body.region;

  const district = await findModelById(District, distId);

  district.name = name;
  district.region = region;

  const data = await district.save();

  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.deleteDistricts = asyncHandler(async (req, res, next) => {
  const destId = req.params.id;

  const deletedData = await findModelById(District, destId);

  if (deletedData.creatorId.toString() !== req.user._id) {
    const error = new Error(
      "Permission denied: You don't have the right to delete this district",
      403
    );
    throw error;
  }

  const data = await District.findByIdAndDelete(destId);

  const region = data.region.toString();

  const reg = await findModelById(Region, region);

  reg.districts.pull(destId);

  const regSaveData = await reg.save();

  res.status(200).json({
    message: "District is deleted successfully",
    data,
    region: regSaveData,
  });
});
