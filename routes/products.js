const express = require('express')
const {body} = require('express-validator')
const Products = require('../controllers/products')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,Products.getProducts)
router.get('/:id',IsAuth,Products.getProductsId)

router.post('/',IsAuth,[body('productname').trim().isLength({min:3})],Products.createProducts)
router.put('/:id',IsAuth,Products.updateProducts)
router.delete('/:id',IsAuth,Products.deleteProducts)
router.get('/tariff/filter',IsAuth,Products.getTariff)


module.exports = router