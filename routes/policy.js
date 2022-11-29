const express = require('express')
const {body} = require('express-validator')
const policy = require('../controllers/policy')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,policy.getPolicy)
router.get('/:id',IsAuth,policy.getPolicyById)

router.post('/',IsAuth,policy.createPolicy)
router.put('/:id',IsAuth,policy.updatePolicy)
router.delete('/:id',IsAuth,policy.deletePolicy)
router.get('/f/:id',IsAuth,policy.getPolicyByAgeementId)


module.exports = router