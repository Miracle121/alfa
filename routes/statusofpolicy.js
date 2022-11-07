const express = require('express')
const {body} = require('express-validator')
const statusofpolicy = require('../controllers/statusofpolicy')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,statusofpolicy.getStatusofpolicy)
router.get('/:id',IsAuth,statusofpolicy.getStatusofpolicyById)
router.post('/',IsAuth,statusofpolicy.createStatusofpolicy)
router.put('/:id',IsAuth,statusofpolicy.updateStatusofpolicy)
router.delete('/:id',IsAuth,statusofpolicy.deleteStatusofpolicy)

module.exports = router