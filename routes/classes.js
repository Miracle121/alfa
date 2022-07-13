const express = require('express')
const {body} = require('express-validator')
const classesofproduct = require('../controllers/classes')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,classesofproduct.getClassesofproduct)
router.get('/:id',IsAuth,classesofproduct.getClassesofproductId)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],classesofproduct.createClassesofproduct)
router.put('/:id',IsAuth,classesofproduct.updateClassesofproduct)
router.delete('/:id',IsAuth,classesofproduct.deleteClassesofproduct)


module.exports = router