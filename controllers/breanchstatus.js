const Breanchstatus = require("../models/breanchstatus");

exports.getBreanchstatus = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

exports.getBreanchstatusById = async (req, res, next) => {
  const AgesId = req.params.id;

  const result = await findModelById(Breanchstatus, AgesId);

  res.status(200).json({
    message: `Breanchstatus`,
    data: result,
  });
};

exports.createBreanchstatus = async (req, res, next) => {
  const name = req.body.name;

  const result = new Breanchstatus({
    name: name,
    creatorId: req.user._id,
  });
  const results = await result.save();
  res.status(200).json({
    message: `Breanchstatus created`,
    data: results,
    creatorId: req.user._id,
  });
};

exports.updateBreanchstatus = async (req, res, next) => {
  const AgesId = req.params.id;
  const name = req.body.name;

  const result = await findModelById(Breanchstatus, AgesId);

  result.name = name;

  const data = await result.save();

  res.status(200).json({
    message: `Breanchstatus List`,
    data: data,
  });
};

exports.deleteBreanchstatus = async (req, res, next) => {
  const AgesId = req.params.id;

  const deleteddata = await findModelById(Breanchstatus, AgesId);

  if (deleteddata.creatorId.toString() !== req.userId) {
    const error = new Error("bu userni ochirishga imkoni yoq");
    error.statusCode = 403;
    throw error;
  }

  const data = await Breanchstatus.findByIdAndRemove(AgesId);

  res.status(200).json({
    message: "Breanchstatus is deletes",
    data: data,
  });
};
