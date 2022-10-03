const express = require('express')
const {body} = require('express-validator')
const paymentcurrency = require('../controllers/paymentcurrency')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,paymentcurrency.getPaymentcurrency)
router.get('/:id',IsAuth,paymentcurrency.getPaymentcurrencyId)

router.post('/',IsAuth,paymentcurrency.createPaymentcurrency)
router.put('/:id',IsAuth,paymentcurrency.updatePaymentcurrency)
router.delete('/:id',IsAuth,paymentcurrency.deletePaymentcurrency)


module.exports = router