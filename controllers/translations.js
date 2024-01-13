const asyncHandler = require("express-async-handler");
const Translations = require("../models/translations");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getTranslations = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTranslationsId = asyncHandler(async (req, res, next) => {
  const translationsId = req.params.id;

  const translations = await findModelById(Translations, translationsId);

  res.status(200).json({
    message: "Translations of products",
    data: translations,
  });
});

exports.createTranslations = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }
  const key = Object.keys(req.body);

  // Create a new Translations instance
  const translation = new Translations({
    key: key[0],
    uz: key[0],
    ru: key[0],
    lang: key[0],
    creatorId: req.user._id,
  });

  // Save the translation to the database
  const savedTranslation = await translation.save();

  res.status(201).json({
    message: "Translations of products",
    data: savedTranslation,
    creatorId: req.user._id,
  });
});

exports.updateTranslations = asyncHandler(async (req, res, next) => {
  const translationsId = req.params.id;
  const { key, uz, ru, eng } = req.body; // Object destructuring for cleaner code

  try {
    // Use findByIdAndUpdate to simplify code
    const updatedTranslation = await Translations.findByIdAndUpdate(
      translationsId,
      { key, uz, ru, eng },
      { new: true, runValidators: true } // new: true returns the modified document, runValidators: true runs validators on update
    );

    if (!updatedTranslation) {
      const error = new Error("Object not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Translations of products updated",
      data: updatedTranslation,
    });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

exports.deleteTranslations = asyncHandler(async (req, res, next) => {
  const subgroupsId = req.params.id;

  const deleteddata = await findModelById(Translations, subgroupsId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("Bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Translations.findByIdAndDelete(subgroupsId);

  res.status(200).json({
    message: "Classe of products",
    data: data,
  });
});

exports.getByLanguages = asyncHandler(async (req, res, next) => {
  const lan = req.params.id;

  const translations = await Translations.find({}, ["key", lan]);
  if (!translations || translations.length === 0) {
    const error = new Error("Translations not found");
    error.statusCode = 404;
    throw error;
  }

  let obj = {};
  translations.forEach((translation) => {
    const { key, [lan]: languageValue } = translation.toObject(); // Use toObject to convert Mongoose document to plain JavaScript object
    obj[key] = languageValue;
  });

  res.status(200).json(obj);
});
