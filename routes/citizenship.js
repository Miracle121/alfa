const express = require('express')
const {body} = require('express-validator')
const citizenship = require('../controllers/citizenship')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,citizenship.getCitizenship)
router.get('/:id',IsAuth,citizenship.getCitizenshipById)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],citizenship.createCitizenship)
router.put('/:id',IsAuth,citizenship.updateCitizenship)
router.delete('/:id',IsAuth,citizenship.deleteCitizenship)

module.exports = router