const express = require('express')
const {body} = require('express-validator')
const roles = require('../controllers/role')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,roles.getRole)
router.get('/:id',IsAuth,roles.getRoleId)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],roles.createRole)
router.put('/:id',IsAuth,roles.updateRole)
router.delete('/:id',IsAuth,roles.deleteRole)


module.exports = router