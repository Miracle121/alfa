const express = require('express')
const {body} = require('express-validator')
const typeofsector = require('../controllers/typeofsector')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofsector.getTypeofsector)
router.get('/:id',IsAuth,typeofsector.getTypeofsectorId)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],typeofsector.createTypeofsector)
router.put('/:id',IsAuth,typeofsector.updateTypeofsector)
router.delete('/:id',IsAuth,typeofsector.deleteTypeofsector)


module.exports = router