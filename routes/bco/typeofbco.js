const express = require('express')

const typeofbco = require('../../controllers/bco/typeofbco')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofbco.getTypeofbco)
router.get('/:id',IsAuth,typeofbco.getTypeofbcoById)

router.post('/',IsAuth,typeofbco.createTypeofbco)
router.put('/:id',IsAuth,typeofbco.updateTypeofbco)
router.delete('/:id',IsAuth,typeofbco.deleteTypeofbco)


module.exports = router