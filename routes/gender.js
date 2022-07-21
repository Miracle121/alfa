const express = require('express')
const {body} = require('express-validator')
const genders = require('../controllers/gender')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,genders.getGenders)
router.get('/:id',IsAuth,genders.getGendersById)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],genders.createGenders)
router.put('/:id',IsAuth,genders.updateGenders)
router.delete('/:id',IsAuth,genders.deleteGenders)

module.exports = router