const asyncHandler = require("express-async-handler");
const Typeofobject = require("../models/typeofobject");
const { validationResult } = require("express-validator");
const { findModelById } = require("../util/findModelById");
const { ErrorResponse } = require("../util/errorResponse");

exports.getTypeofobject = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTypeofobjectId = asyncHandler(async (req, res, next) => {
  const typeofobkectsId = req.params.id;

  const typeofobject = await findModelById(Typeofobject, typeofobkectsId);

  res.status(200).json({
    message: `Type of objects`,
    data: typeofobject,
  });
});

exports.createTypeofobject = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation error", 422);
    throw error;
  }

  const name = req.body.name;
  const group = new Typeofobject({
    name: name,
    creatorId: req.user._id,
  });

  const groups = await group.save();

  res.status(201).json({
    message: `Police added`,
    data: groups,
    creatorId: req.user._id,
  });
});

exports.updateTypeofobject = asyncHandler(async (req, res, next) => {
  const typeofobjectId = req.params.id;
  const name = req.body.name;

  const groups = await findModelById(Typeofobject, typeofobjectId);

  groups.name = name;

  const typeofrisk = await groups.save();

  res.status(200).json({
    message: `Police added`,
    data: typeofrisk,
  });
});

exports.deleteTypeofobject = asyncHandler(async (req, res, next) => {
  const typeofobjectsId = req.params.id;

  const deleteddata = await findModelById(Typeofobject, typeofobjectsId);

  if (deleteddata.creatorId.toString() !== req.user._id) {
    const error = new ErrorResponse("bu userni ochirishga imkoni yoq", 403);
    throw error;
  }

  const data = await Typeofobject.findByIdAndDelete(typeofobjectsId);

  res.status(200).json({
    message: "Risks is deleted",
    data: data,
  });
});

exports.getInputs = asyncHandler(async (req, res, next) => {
  const typeofobjectsId = req.params.id;

  const selectedObjectType = await findModelById(Typeofobject, typeofobjectsId);

  const objectTypes = [
    {
      label: "Транспортное средство",
      fields: [
        {
          type: "checkbox",
          name: "foreign_vehicle",
          label: "Иностранное транспортное средство",
          default: false,
        },
        {
          type: "input",
          name: "gov_number",
          label: "GOV NUMBER",
          rules: [],
        },
        {
          type: "select",
          name: "registration_region",
          url: "regions?limit=50",
          label: "Регион регистрации",
        },
        {
          type: "input",
          name: "model",
          label: "Модель",
          rules: [],
        },
        {
          type: "select",
          name: "type",
          label: "Вид",
          url: "views?limit=50",
        },
        {
          type: "input",
          name: "manufacture_year",
          label: "Год выпуска",
          rules: [],
        },
        {
          type: "input",
          name: "body_number",
          label: "Номер кузова",
          rules: [],
        },
        {
          type: "input",
          name: "payload_capacity",
          label: "Грузоподъемность",
          rules: [],
        },
        {
          type: "input",
          name: "seating_capacity",
          label: "Количество мест",
          rules: [],
        },
        {
          type: "input",
          name: "engine_number",
          label: "Номер двигателя",
          rules: [],
        },
        {
          type: "input",
          name: "tech_passport_series",
          label: "Серия тех.паспорта",
          rules: [],
        },
        {
          type: "input",
          name: "tech_passport_number",
          label: "Номер тех.паспорта",
          rules: [],
        },
      ],
    },
    {
      label: "Недвижимое имущество",
      fields: [
        {
          type: "select",
          name: "region",
          url: "regions?limit=50",
          label: "Регион",
        },
        {
          type: "select",
          name: "land_rights",
          label: "Вид права на земельный участок",
          url: "typeofland?limit=50",
        },
        {
          type: "checkbox",
          name: "foreign_owner",
          label: "Правообладатель - иностранец",
          default: false,
        },
        {
          type: "input",
          name: "cadastral_number",
          label: "Кадастровый номер",
          rules: [],
        },
        {
          type: "string",
          name: "registration_date",
          label: "Дата регистрации кадастрового документа",
          rules: [],
        },
        {
          type: "select",
          name: "building_classification",
          label: "Классификация строения",
          url: "classification?limit=50",
        },
        {
          type: "input",
          name: "object_description",
          label: "Описание объекта",
          rules: [],
        },
        {
          type: "input",
          name: "address",
          label: "Адрес",
          rules: [],
        },
      ],
    },
    {
      label: "Объект сельхозназначения",
      fields: [
        {
          type: "select",
          name: "region",
          url: "regions?limit=50",
          label: "Регион",
        },
        {
          type: "checkbox",
          name: "foreign_owner",
          label: "Правообладатель - иностранец",
          default: false,
        },
        {
          type: "select",
          name: "agricultural_object_type",
          label: "Объект сельхозназначения",
          url: "agricultural?limit=50",
        },
        {
          type: "input",
          name: "object_name",
          label: "Наименование",
          rules: [],
        },
        {
          type: "input",
          name: "object_description",
          label: "Описание",
          rules: [],
        },
        {
          type: "select",
          name: "measurement_type",
          label: "Тип измерения",
          url: "measurements?limit=50",
        },
        {
          type: "input",
          name: "insurance_volume",
          label: "Объем страхования",
          rules: [],
        },
        {
          type: "input",
          name: "address",
          label: "Адрес",
          rules: [],
        },
      ],
    },
    {
      label: "Другой",
      fields: [
        {
          type: "select",
          name: "region",
          label: "Регион",
          url: "regions?limit=50",
        },
        {
          type: "checkbox",
          name: "foreign_owner",
          label: "Правообладатель - иностранец",
          default: false,
        },
        {
          type: "input",
          name: "object_name",
          label: "Наименование",
          rules: [],
        },
        {
          type: "input",
          name: "object_description",
          label: "Описание",
          rules: [],
        },
        {
          type: "select",
          name: "measurement_type",
          label: "Тип измерения",
          url: "measurements?limit=50",
        },
        {
          type: "input",
          name: "insurance_volume",
          label: "Объем страхования",
          rules: [],
        },
        {
          type: "input",
          name: "address",
          label: "Адрес",
          rules: [],
        },
      ],
    },
  ];

  const selectedObjectFields =
    objectTypes.find(
      (type) =>
        type.label.toLocaleLowerCase() ===
        selectedObjectType.name.toLocaleLowerCase()
    )?.fields || objectTypes.at(-1).fields;

  res.status(200).json({
    success: true,
    data: selectedObjectFields,
  });
});
