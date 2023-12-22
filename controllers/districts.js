const asyncHandler = require("express-async-handler");
const Districts = require("../models/districts");
const Region = require("../models/regions");
const { findModelById } = require("../util/findModelById");

exports.getDistricts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getDistrictsById = asyncHandler(async (req, res, next) => {
  const regId = req.params.id;

  const dist = await findModelById(Districts, regId, ("regiId", "name"));

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: dist,
  });
});

exports.getDistrictsByRegId = asyncHandler(async (req, res, next) => {
  const regId = req.params.id;

  const dist = await Districts.find({ regiId: regId }).populate({
    path: "regiId",
    select: "name",
    match: { _id: regId },
  });

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: dist,
  });
});

exports.createDistricts = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const regiId = req.body.regiId;

  const dist = new Districts({
    name,
    regiId,
    creatorId: req.user._id,
  });

  const districts = await dist.save();

  const region = await findModelById(Region, regiId);

  region.districts.push(districts);

  const reg = await region.save();

  res.status(200).json({
    message: `ma'lumotlar kiritildi`,
    data: districts,
    creatorId: req.user._id,
    reg: reg,
  });
});

exports.updateDistricts = asyncHandler(async (req, res, next) => {
  const distId = req.params.id;
  const name = req.body.name;
  const regId = req.body.regiId;

  const district = await findModelById(Districts, distId);

  district.name = name;
  district.regiId = regId;

  const data = await district.save();

  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.deleteDistricts = asyncHandler(async (req, res, next) => {
  const destId = req.params.id;

  const deletedData = await findModelById(Districts, destId);

  if (deletedData.creatorId.toString() !== req.userId) {
    const error = new Error(
      "Permission denied: You don't have the right to delete this district",
      403
    );
    throw error;
  }

  const data = await Districts.findByIdAndRemove(destId);

  const regId = data.regiId.toString();

  const reg = await findModelById(Region, regId);

  reg.districts.pull(destId);

  const regSaveData = await reg.save();

  res.status(200).json({
    message: "District is deleted successfully",
    data,
    region: regSaveData,
  });
});
