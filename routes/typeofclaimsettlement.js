const express = require('express')
const {body} = require('express-validator')
const typeofclaimsettlement = require('../controllers/typeofclaimsettlement')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofclaimsettlement.getTypeofclaimsettlement)
router.get('/:id',IsAuth,typeofclaimsettlement.getTypeofclaimsettlementById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],typeofclaimsettlement.createTypeofclaimsettlement)
router.put('/:id',IsAuth,typeofclaimsettlement.updateTypeofclaimsettlement)
router.delete('/:id',IsAuth,typeofclaimsettlement.deleteTypeofclaimsettlement)


module.exports = router