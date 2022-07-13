const express = require('express')
const {body} = require('express-validator')
const typeofrisks = require('../controllers/typeofrisks')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofrisks.getTypeofrisks)
router.get('/:id',IsAuth,typeofrisks.getTypeofrisksId)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],typeofrisks.createTypeofrisks)
router.put('/:id',IsAuth,typeofrisks.updateTypeofrisks)
router.delete('/:id',IsAuth,typeofrisks.deleteTypeofrisks)


module.exports = router