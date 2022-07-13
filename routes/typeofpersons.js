const express = require('express')
const {body} = require('express-validator')
const typeofpersons = require('../controllers/typeofpersons')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofpersons.getTypeofpersons)
router.get('/:id',IsAuth,typeofpersons.getTypeofpersonsById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],typeofpersons.createTypeofpersons)
router.put('/:id',IsAuth,typeofpersons.updateTypeofpersons)
router.delete('/:id',IsAuth,typeofpersons.deleteTypeofpersons)


module.exports = router