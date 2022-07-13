const express = require('express')
const {body} = require('express-validator')
const applicationformdocs = require('../controllers/applicationformdocs')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,applicationformdocs.getApplicationformdocs)
router.get('/:id',IsAuth,applicationformdocs.getApplicationformdocsById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],applicationformdocs.createApplicationformdocs)
router.put('/:id',IsAuth,applicationformdocs.updateApplicationformdocs)
router.delete('/:id',IsAuth,applicationformdocs.deleteApplicationformdocs)


module.exports = router