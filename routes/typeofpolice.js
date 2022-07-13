const express = require('express')
const {body} = require('express-validator')
const typeofpolice = require('../controllers/typeofpolice')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofpolice.getTypeofpolice)
router.get('/:id',IsAuth,typeofpolice.getTypeofpoliceId)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],typeofpolice.createTypeofpolice)
router.put('/:id',IsAuth,typeofpolice.updateTypeofpolice)
router.delete('/:id',IsAuth,typeofpolice.deleteTypeofpolice)


module.exports = router