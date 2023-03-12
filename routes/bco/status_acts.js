const express = require('express')

const StatusActs = require('../../controllers/bco/status_acts')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,StatusActs.getStatusActs)
router.get('/:id',IsAuth,StatusActs.getStatusActsById)

router.post('/',IsAuth,StatusActs.createStatusActs)
router.put('/:id',IsAuth,StatusActs.updateStatusActs)
router.delete('/:id',IsAuth,StatusActs.deleteStatusActs)


module.exports = router