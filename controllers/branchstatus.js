const Branchstatus = require("../models/branchstatus");

exports.getBranchstatus = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

exports.getBranchstatusById = async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Branchstatus, AgesId);

  res.status(200).json({
    message: `Branchstatus`,
    data: result,
  });
};

exports.createBranchstatus = async (req, res, next) => {
  const name = req.body.name;

  const result = new Branchstatus({
    name: name,
    creatorId: req.user._id,
  });
  const results = await result.save();
  res.status(200).json({
    message: `Branchstatus created`,
    data: results,
    creatorId: req.user._id,
  });
};

exports.updateBranchstatus = async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(Branchstatus, AgesId);

  result.name = name;

  const data = await result.save();

  res.status(200).json({
    message: `Branchstatus List`,
    data: data,
  });
};

exports.deleteBranchstatus = async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Branchstatus, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new Error("bu userni ochirishga imkoni yoq");
    error.statusCode = 403;
    throw error;
  }

  const data = await Branchstatus.findByIdAndRemove(AgesId);

  res.status(200).json({
    message: "Branchstatus is deletes",
    data: data,
  });
};
