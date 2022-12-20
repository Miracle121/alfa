const express = require('express')
const {body} = require('express-validator')
const languagepolicy = require('../../controllers/bco/languagepolicy')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,languagepolicy.getLanguagepolicy)
router.get('/:id',IsAuth,languagepolicy.getLanguagepolicyById)

router.post('/',IsAuth,languagepolicy.createLanguagepolicy)
router.put('/:id',IsAuth,languagepolicy.updateLanguagepolicy)
router.delete('/:id',IsAuth,languagepolicy.deleteLanguagepolicy)


module.exports = router