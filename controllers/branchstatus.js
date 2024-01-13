const breanchstatus = require("../models/branchstatus");

exports.getbreanchstatus = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

exports.getbreanchstatusById = async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(breanchstatus, AgesId);

  res.status(200).json({
    message: `breanchstatus`,
    data: result,
  });
};

exports.createbreanchstatus = async (req, res, next) => {
  const name = req.body.name;

  const result = new breanchstatus({
    name: name,
    creatorId: req.user._id,
  });
  const results = await result.save();
  res.status(200).json({
    message: `breanchstatus created`,
    data: results,
    creatorId: req.user._id,
  });
};

exports.updatebreanchstatus = async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(breanchstatus, AgesId);

  result.name = name;

  const data = await result.save();

  res.status(200).json({
    message: `breanchstatus List`,
    data: data,
  });
};

exports.deletebreanchstatus = async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(breanchstatus, AgesId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new Error("bu userni ochirishga imkoni yoq");
    error.statusCode = 403;
    throw error;
  }

  const data = await breanchstatus.findByIdAndDelete(AgesId);

  res.status(200).json({
    message: "breanchstatus is deletes",
    data: data,
  });
};
