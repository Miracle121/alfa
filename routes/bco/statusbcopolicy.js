const express = require('express')

const statusbcopolicy = require('../../controllers/bco/statusbcopolicy')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,statusbcopolicy.getStatusbcopolicy)
router.get('/:id',IsAuth,statusbcopolicy.getStatusbcopolicyById)

router.post('/',IsAuth,statusbcopolicy.createStatusbcopolicy)
router.put('/:id',IsAuth,statusbcopolicy.updateStatusbcopolicy)
router.delete('/:id',IsAuth,statusbcopolicy.deleteStatusbcopolicy)


module.exports = router