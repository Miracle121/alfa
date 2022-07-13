const express = require('express')
const {body} = require('express-validator')
const typeofobject = require('../controllers/typeofobject')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofobject.getTypeofobject)
router.get('/:id',IsAuth,typeofobject.getTypeofobjectId)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],typeofobject.createTypeofobject)
router.put('/:id',IsAuth,typeofobject.updateTypeofobject)
router.delete('/:id',IsAuth,typeofobject.deleteTypeofobject)


module.exports = router