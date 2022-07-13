const express = require('express')
const {body} = require('express-validator')
const policyformats = require('../controllers/policyformats')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,policyformats.getPolicyformats)
router.get('/:id',IsAuth,policyformats.getPolicyformatsId)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],policyformats.createPolicyformats)
router.put('/:id',IsAuth,policyformats.updatePolicyformats)
router.delete('/:id',IsAuth,policyformats.deletePolicyformats)


module.exports = router