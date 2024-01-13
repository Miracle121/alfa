const asyncHandler = require("express-async-handler");
const District = require("../models/districts");
const Mfy = require("../models/mfy");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getMfy = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getMfyById = asyncHandler(async (req, res, next) => {
  const mfyId = req.params.id;

  const mfy = await findModelById(Mfy, mfyId, [
    { path: "district", select: "name" },
    { path: "region", select: "name" },
  ]);

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: mfy,
  });
});

exports.createMfy = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const region = req.body.region;
  const district = req.body.district;

  const mfy = await Mfy.create({
    name: name,
    region: region,
    district: district,
    creatorId: req.user._id,
  });

  res.status(200).json({
    message: `ma'lumotlar kiritildi`,
    data: mfy,
    creatorId: req.user._id,
  });
});

exports.updateMfy = asyncHandler(async (req, res, next) => {
  const mfyId = req.params.id;
  const { name, region, district } = req.body;

  const mfy = await findModelById(Mfy, mfyId);

  mfy.name = name;
  mfy.region = region;
  mfy.district = district;

  const data = await mfy.save();

  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.deleteMfy = asyncHandler(async (req, res, next) => {
  const mfyId = req.params.id;

  const deleteddata = await findModelById(Mfy, mfyId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Mfy.findByIdAndDelete(mfyId);

  const district = data.district.toString();

  const dist = await findModelById(District, district);

  dist.mfy.pull(mfyId);

  await dist.save();

  res.status(200).json({
    message: "Region is deletes",
    data,
  });
});
