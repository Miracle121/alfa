const express = require('express')
const {body} = require('express-validator')
const transactionlog = require('../../controllers/billing/transactionlog')
// const IsAuth = require('../../middleware/is-auth')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,transactionlog.getTransactionlog)
router.get('/:id',IsAuth,transactionlog.getTransactionlogById)

router.post('/',IsAuth,transactionlog.createTransactionlog)
router.put('/:id',IsAuth,transactionlog.updateTransactionlog)
router.delete('/:id',IsAuth,transactionlog.deleteTransactionlog)
router.post('/transaction_date/:id',IsAuth,transactionlog.transaction_date)




module.exports = router