const express = require('express')
const {body} = require('express-validator')
const subclasses = require('../controllers/subclasses')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,subclasses.getSubClassesofproduct)
router.get('/:id',IsAuth,subclasses.getSubClassesofproductId)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],subclasses.createSubClassesofproduct)
router.put('/:id',IsAuth,subclasses.updateSubClassesofproduct)
router.delete('/:id',IsAuth,subclasses.deleteSubClassesofproduct)


module.exports = router