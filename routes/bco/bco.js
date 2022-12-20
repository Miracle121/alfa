const express = require('express')

const bco = require('../../controllers/bco/bco')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,bco.getBco)
router.get('/:id',IsAuth,bco.getBcoById)

router.post('/',IsAuth,bco.createBco)
router.put('/:id',IsAuth,bco.updateBco)
router.delete('/:id',IsAuth,bco.deleteBco)


module.exports = router