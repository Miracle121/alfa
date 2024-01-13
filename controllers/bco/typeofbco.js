const asyncHandler = require("express-async-handler");
const Typeofbco = require("../../models/bco/typeofbco");

exports.getTypeofbco = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTypeofbcoById = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Typeofbco, AgesId)
    .populate("policy_size_id", "name")
    .populate("language", "name")
    .populate("statusofpolicy", "name");

  res.status(200).json({
    message: `Type of BCO`,
    data: result,
  });
});

exports.createTypeofbco = asyncHandler(async (req, res, next) => {
  const policy_type_name = req.body.policy_type_name;
  const policy_size_id = req.body.policy_size_id;
  const language = req.body.language;
  const policy_series = req.body.policy_series;
  const policy_number_of_digits = req.body.policy_number_of_digits;
  const statusofpolicy = req.body.statusofpolicy;
  const result = new Typeofbco({
    policy_type_name: policy_type_name,
    policy_size_id: policy_size_id,
    language: language,
    policy_series: policy_series,
    policy_number_of_digits: policy_number_of_digits,
    statusofpolicy: statusofpolicy,
    creatorId: req.user._id,
  });
  const results = await result.save();
  res.status(200).json({
    message: `Type of BCO added`,
    data: results,
    creatorId: req.user._id,
  });
});

exports.updateTypeofbco = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;
  const policy_type_name = req.body.policy_type_name;
  const policy_size_id = req.body.policy_size_id;
  const language = req.body.language;
  const policy_series = req.body.policy_series;
  const policy_number_of_digits_start = req.body.policy_number_of_digits_start;
  const policy_number_of_digits_end = req.body.policy_number_of_digits_end;
  const policy_count = Math.abs(
    policy_number_of_digits_start - policy_number_of_digits_end
  );
  const statusofpolicy = req.body.statusofpolicy;

  const result = await findModelById(Typeofbco, AgesId);

  result.policy_type_name = policy_type_name;
  result.policy_size_id = policy_size_id;
  result.language = language;
  result.policy_series = policy_series;
  result.policy_number_of_digits_start = policy_number_of_digits_start;
  result.policy_number_of_digits_end = policy_number_of_digits_end;
  result.policy_count = policy_count;
  result.statusofpolicy = statusofpolicy;

  const data = await result.save();
  res.status(200).json({
    message: `Type of BCO changed`,
    data: data,
  });
});

exports.deleteTypeofbco = asyncHandler(async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Typeofbco, AgesId);
  if (!deleteddata) {
    const error = new Error("Object  not found");
    error.statusCode = 404;
    throw error;
  }
  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("Bu userni ochirishga imkoni yoq", 403);
    throw error;
  }
  const data = await Typeofbco.findByIdAndDelete(AgesId);
  res.status(200).json({
    message: "Type of BCO is deleted",
    data: data,
  });
});
