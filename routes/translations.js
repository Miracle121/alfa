const express = require('express')
const {body} = require('express-validator')
const translations = require('../controllers/translations')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,translations.getTranslations)
router.get('/:id',IsAuth,translations.getTranslationsId)

router.post('/',IsAuth,translations.createTranslations)
router.put('/:id',IsAuth,translations.updateTranslations)
router.delete('/:id',IsAuth,translations.deleteTranslations)
router.get('/lang/:id',translations.getByLanguages)


module.exports = router