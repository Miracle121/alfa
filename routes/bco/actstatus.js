const express = require('express')

const actstatus = require('../../controllers/bco/actstatus')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,actstatus.getActstatus)
router.get('/:id',IsAuth,actstatus.getActstatusById)

router.post('/',IsAuth,actstatus.createActstatus)
router.put('/:id',IsAuth,actstatus.updateActstatus)
router.delete('/:id',IsAuth,actstatus.deleteActstatus)


module.exports = router