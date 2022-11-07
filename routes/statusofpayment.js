const express = require('express')
const {body} = require('express-validator')
const statusofpayment = require('../controllers/statusofpayment')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,statusofpayment.getStatusofpayment)
router.get('/:id',IsAuth,statusofpayment.getStatusofpaymentById)
router.post('/',IsAuth,statusofpayment.createStatusofpayment)
router.put('/:id',IsAuth,statusofpayment.updateStatusofpayment)
router.delete('/:id',IsAuth,statusofpayment.deleteStatusofpayment)

module.exports = router