const express = require("express");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");
const crudUtil = require("../util/crud");
const Measurement = require("../models/measurements");
const View = require("../models/views");
const Typeofland = require("../models/typeofland");
const Classification = require("../models/classifications");
const Agricultural = require("../models/agriculturaloblect");

const router = express.Router();

router.use(IsAuth);

const measurments = crudUtil(Measurement);
const agricultural = crudUtil(Agricultural);
const views = crudUtil(View);
const typeofland = crudUtil(Typeofland);
const classification = crudUtil(Classification);

router
  .route("/measurments/")
  .get(advancedResults(Measurement), measurments.getModel)
  .post(measurments.createModel);
router
  .route("/measurments/:id")
  .get(measurments.getModelById)
  .put(measurments.updateModel)
  .delete(measurments.deleteModel);

router
  .route("/views/")
  .get(advancedResults(View), views.getModel)
  .post(views.createModel);
router
  .route("/views/:id")
  .get(views.getModelById)
  .put(views.updateModel)
  .delete(views.deleteModel);

router
  .route("/typeofland/")
  .get(advancedResults(Typeofland), typeofland.getModel)
  .post(typeofland.createModel);
router
  .route("/typeofland/:id")
  .get(typeofland.getModelById)
  .put(typeofland.updateModel)
  .delete(typeofland.deleteModel);

router
  .route("/classification/")
  .get(advancedResults(Classification), classification.getModel)
  .post(classification.createModel);
router
  .route("/classification/:id")
  .get(classification.getModelById)
  .put(classification.updateModel)
  .delete(classification.deleteModel);

router
  .route("/agricultural/")
  .get(advancedResults(Agricultural), agricultural.getModel)
  .post(agricultural.createModel);
router
  .route("/agricultural/:id")
  .get(agricultural.getModelById)
  .put(agricultural.updateModel)
  .delete(agricultural.deleteModel);

module.exports = router;
