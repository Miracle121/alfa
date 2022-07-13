const express = require('express')
const {body} = require('express-validator')
const baseoffranchise = require('../controllers/baseoffranchise')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,baseoffranchise.getBaseoffranchise)
router.get('/:id',IsAuth,baseoffranchise.getBaseoffranchiseById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],baseoffranchise.createBaseoffranchise)
router.put('/:id',IsAuth,baseoffranchise.updateBaseoffranchise)
router.delete('/:id',IsAuth,baseoffranchise.deleteBaseoffranchise)


module.exports = router