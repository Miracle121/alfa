const asyncHandler = require("express-async-handler");
const Districts = require("../models/districts");
const Mfy = require("../models/mfy");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getMfy = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedresults);
});

exports.getMfyById = asyncHandler(async (req, res, next) => {
  const mfyId = req.params.id;

  const mfy = await findModelById(Mfy, mfyId, [
    { path: "districtId", select: "name" },
    { path: "regionId", select: "name" },
  ]);

  res.status(200).json({
    message: `ma'lumotlar topildi`,
    data: mfy,
  });
});

exports.createMfy = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const regionId = req.body.regionId;
  const districtId = req.body.districtId;

  const mahalla = new Mfy({
    name: name,
    regionId: regionId,
    districtId: districtId,
    creatorId: req.user._id,
  });

  const mfy = await mahalla.save();
  const dist = await Districts.findById({ _id: districtId });

  dist.mfy.push(mfy._id);

  const district = await dist.save();

  res.status(200).json({
    message: `ma'lumotlar kiritildi`,
    data: mfy,
    district: district,
    creatorId: req.user._id,
  });
});

exports.updateMfy = asyncHandler(async (req, res, next) => {
  const mfyId = req.params.id;
  const name = req.body.name;
  const regionId = req.body.regionId;
  const districtId = req.body.districtId;

  const mfy = await findModelById(Mfy, mfyId);

  mfy.name = name;
  mfy.regionId = regionId;
  mfy.districtId = districtId;

  const data = await mfy.save();

  res.status(200).json({
    message: `ma'lumotlar o'zgartirildi`,
    data: data,
  });
});

exports.deleteMfy = asyncHandler(async (req, res, next) => {
  const mfyId = req.params.id;

  const deleteddata = await findModelById(Mfy, mfyId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Mfy.findByIdAndRemove(mfyId);

  const districtId = data.districtId.toString();

  const dist = await findModelById(Districts, districtId);

  dist.mfy.pull(mfyId);

  await dist.save();

  res.status(200).json({
    message: "Region is deletes",
    data,
  });
});
