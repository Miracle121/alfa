const express = require("express");
const { body } = require("express-validator");
const products = require("../controllers/products");
const Products = require("../models/products");
const IsAuth = require("../middleware/is-auth");
const { advancedResults } = require("../middleware/advancedResults");

const router = express.Router();

router.use(IsAuth);

const populateOptions = [
  { path: "groupofproductsId", select: "name" },
  { path: "subgroupofproductsId", select: "name" },
  { path: "typeofbco_Id", select: "policy_type_name" },
  { path: "typeofsectorId", select: "name" },
  { path: "typeofinsurerId", select: "name" },
  { path: "statusofproducts", select: "name" },
  { path: "riskId.riskgroup", select: "name" },
  { path: "riskId.risk", select: "name" },
  { path: "riskId.classeId", select: "name" },
  { path: "applicationformId", select: "name" },
  { path: "additionaldocuments", select: "name" },
  { path: "fixedpolicyholder", select: "inn" },
  { path: "fixedbeneficiary", select: "fullName" },
  { path: "policyformatId", select: "name" },
  { path: "typeofclaimsettlement", select: "name" },
  { path: "typeofrefund", select: "name" },
  { path: "typeofrefund", select: "name" },
  { path: "typeofpayment", select: "name" },
  { path: "typeofpolice", select: "name" },
  // { path: 'agentlist', select: 'fullName' },
  // { path: 'tariffperclasses.classes', select: 'name' },
  { path: "franchise.risk", select: "name" },
  { path: "franchise.typeoffranchise", select: "name" },
  { path: "franchise.baseoffranchise", select: "name" },
  {
    path: "tariff",
    populate: [
      { path: "agentlist", select: "inn" },
      {
        path: "tariffperclasses",
        populate: [{ path: "classes", select: "name" }],
      },
    ],
  },
];

router.get(
  "/",
  advancedResults(Products, populateOptions),
  products.getProducts
);
router.get("/:id", products.getProductsId);

router.post(
  "/",
  [body("productname").trim().isLength({ min: 3 })],
  products.createProducts
);
router.put("/:id", products.updateProducts);
router.delete("/:id", products.deleteProducts);

module.exports = router;
