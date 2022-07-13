const express = require('express')
const {body} = require('express-validator')
const accountstatus = require('../controllers/accountstatus')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,accountstatus.getAccountstatus)
router.get('/:id',IsAuth,accountstatus.getAccountstatusById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],accountstatus.createAccountstatus)
router.put('/:id',IsAuth,accountstatus.updateAccountstatus)
router.delete('/:id',IsAuth,accountstatus.deleteAccountstatus)


module.exports = router