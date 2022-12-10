const express = require('express')
const {body} = require('express-validator')
const typeofdistribute = require('../../controllers/billing/typeofdistribute')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofdistribute.getTypeofdistributes)
router.get('/:id',IsAuth,typeofdistribute.getTypeofdistributesById)

router.post('/',IsAuth,typeofdistribute.createTypeofdistributes)
router.put('/:id',IsAuth,typeofdistribute.updateTypeofdistributes)
router.delete('/:id',IsAuth,typeofdistribute.deleteTypeofdistributes)


module.exports = router