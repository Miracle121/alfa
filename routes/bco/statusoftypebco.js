const express = require('express')

const statusoftypebco = require('../../controllers/bco/statusoftypebco')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,statusoftypebco.getStatusoftypebco)
router.get('/:id',IsAuth,statusoftypebco.getStatusoftypebcoById)

router.post('/',IsAuth,statusoftypebco.createStatusoftypebco)
router.put('/:id',IsAuth,statusoftypebco.updateStatusoftypebco)
router.delete('/:id',IsAuth,statusoftypebco.deleteStatusoftypebco)


module.exports = router