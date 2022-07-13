const express = require('express')
const {body} = require('express-validator')
const rypeofrefund = require('../controllers/typeofrefund')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,rypeofrefund.getTypeofrefund)
router.get('/:id',IsAuth,rypeofrefund.getTypeofrefundById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],rypeofrefund.createTypeofrefund)
router.put('/:id',IsAuth,rypeofrefund.updateTypeofrefund)
router.delete('/:id',IsAuth,rypeofrefund.deleteTypeofrefund)


module.exports = router