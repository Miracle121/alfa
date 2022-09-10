const express = require('express')
const {body} = require('express-validator')
const fieldofendorsements = require('../controllers/fieldofendorsements')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,fieldofendorsements.getFieldofendorsements)
router.get('/:id',IsAuth,fieldofendorsements.getFieldofendorsementsById)

router.post('/',IsAuth,fieldofendorsements.createFieldofendorsements)
router.put('/:id',IsAuth,fieldofendorsements.updateFieldofendorsements)
router.delete('/:id',IsAuth,fieldofendorsements.deleteFieldofendorsements)


module.exports = router