const express = require('express')
const typeofposition = require('../controllers/typeofposition')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofposition.getTypeofposition)
router.get('/:id',IsAuth,typeofposition.getTypeofpositionId)

router.post('/',IsAuth,typeofposition.createTypeofposition)
router.put('/:id',IsAuth,typeofposition.updateTypeofposition)
router.delete('/:id',IsAuth,typeofposition.deleteTypeofposition)


module.exports = router