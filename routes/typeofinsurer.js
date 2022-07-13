const express = require('express')
const {body} = require('express-validator')
const typeofinsurer = require('../controllers/typeofinsurer')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofinsurer.getTypeOfInsurer)
router.get('/:id',IsAuth,typeofinsurer.getTypeOfInsurerById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],typeofinsurer.createTypeOfInsurer)
router.put('/:id',IsAuth,typeofinsurer.updateTypeOfInsurer)
router.delete('/:id',IsAuth,typeofinsurer.deleteTypeOfInsurer)


module.exports = router