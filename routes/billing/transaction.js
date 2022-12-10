const express = require('express')
const {body} = require('express-validator')
const transaction = require('../../controllers/billing/transaction')
// const IsAuth = require('../../middleware/is-auth')
const IsAuth = require('../../middleware/is-auth')
const upload = require('../../middleware/upload')
const router = express.Router()

router.get('/',IsAuth,transaction.getTransaction)
router.get('/:id',IsAuth,transaction.getTransactionById)

router.post('/',IsAuth,upload.single("files"),transaction.createTransaction)
router.put('/:id',IsAuth,transaction.updateTransaction)
router.delete('/:id',IsAuth,transaction.deleteTransaction)


module.exports = router