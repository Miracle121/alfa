const express = require('express')
const {body} = require('express-validator')
const accountroles = require('../controllers/accountroles')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,accountroles.getAccountroles)
router.get('/:id',IsAuth,accountroles.getAccountrolesById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],accountroles.createAccountroles)
router.put('/:id',IsAuth,accountroles.updateAccountroles)
router.delete('/:id',IsAuth,accountroles.deleteAccountroles)


module.exports = router