const express = require('express')
const {body} = require('express-validator')
const typeoffranchise = require('../controllers/typeoffranchise')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeoffranchise.getTypeoffranchise)
router.get('/:id',IsAuth,typeoffranchise.getTypeoffranchiseById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],typeoffranchise.createTypeoffranchise)
router.put('/:id',IsAuth,typeoffranchise.updateTypeoffranchise)
router.delete('/:id',IsAuth,typeoffranchise.deleteTypeoffranchise)


module.exports = router