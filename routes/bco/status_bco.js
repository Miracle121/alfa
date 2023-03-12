const express = require('express')

const statusBco = require('../../controllers/bco/status_bco')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,statusBco.getStatusBco)
router.get('/:id',IsAuth,statusBco.getStatusBcoById)

router.post('/',IsAuth,statusBco.createStatusBco)
router.put('/:id',IsAuth,statusBco.updateStatusBco)
router.delete('/:id',IsAuth,statusBco.deleteStatusBco)


module.exports = router