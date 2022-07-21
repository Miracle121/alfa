const express = require('express')
const {body} = require('express-validator')
const typeofdocuments = require('../controllers/typeofdocuments')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofdocuments.getTypeofdocuments)
router.get('/:id',IsAuth,typeofdocuments.getTypeofdocumentsById)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],typeofdocuments.createTypeofdocuments)
router.put('/:id',IsAuth,typeofdocuments.updateTypeofdocuments)
router.delete('/:id',IsAuth,typeofdocuments.deleteTypeofdocuments)


module.exports = router