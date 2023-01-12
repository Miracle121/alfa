const express = require('express')

const policyblank = require('../../controllers/bco/policyblank')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,policyblank.getPolicyblank)
router.get('/:id',IsAuth,policyblank.getPolicyblankById)

router.post('/',IsAuth,policyblank.createPolicyblank)
router.put('/:id',IsAuth,policyblank.updatePolicyblank)
router.delete('/:id',IsAuth,policyblank.deletePolicyblank)
router.get('/f/:id',IsAuth,policyblank.getPolicyblanknumberByTypeId)


module.exports = router