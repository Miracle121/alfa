const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { findModelById } = require("./findModelById");
const { ErrorResponse } = require("./errorResponse");

/**
 * CRUD utility for Mongoose models.
 * @param {import("mongoose").Model} Model - The Mongoose model.
 */
const crudUtil = (Model) => {
  const getModel = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  });

  const getModelById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const model = await findModelById(Model, id);

    res.status(200).json({
      message: `Details for ${Model.modelName}`,
      data: model,
    });
  });

  const createModel = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new ErrorResponse("Validation error", 422, errors.array());
      throw error;
    }

    const { name } = req.body;

    const createdModel = await Model.create({ name });

    res.status(201).json({
      success: true,
      message: `${Model.modelName} added`,
      data: createdModel,
    });
  });

  const updateModel = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const { name } = req.body;

    const modelToUpdate = await findModelById(Model, id);

    modelToUpdate.name = name;

    const updatedModel = await modelToUpdate.save();

    res.status(200).json({
      message: `${Model.modelName} updated`,
      data: updatedModel,
    });
  });

  const deleteModel = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    await findModelById(Model, id);

    await Model.findByIdAndRemove(id);

    res.status(200).json({
      message: `${Model.modelName} deleted`,
    });
  });

  return {
    getModel,
    getModelById,
    updateModel,
    createModel,
    deleteModel,
  };
};

module.exports = crudUtil;
