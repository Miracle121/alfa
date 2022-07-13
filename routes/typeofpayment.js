const express = require('express')
const {body} = require('express-validator')
const typeofpayment = require('../controllers/typeofpayment')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofpayment.getTypeofpayment)
router.get('/:id',IsAuth,typeofpayment.getTypeofpaymentId)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],typeofpayment.createTypeofpayment)
router.put('/:id',IsAuth,typeofpayment.updateTypeofpayment)
router.delete('/:id',IsAuth,typeofpayment.deleteTypeofpayment)


module.exports = router