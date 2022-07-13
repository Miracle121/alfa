const express = require('express')
const {body} = require('express-validator')
const districts = require('../controllers/districts')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,districts.getDistricts)
router.get('/:id',IsAuth,districts.getDistrictsById)
router.get('/reg/:id',IsAuth,districts.getDistrictsByRegId)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],districts.createDistricts)
router.put('/:id',IsAuth,districts.updateDistricts)
router.delete('/:id',IsAuth,districts.deleteDistricts)


module.exports = router