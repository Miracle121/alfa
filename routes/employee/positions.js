const express = require('express')
const positions = require('../../controllers/employee/positions')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,positions.getPositions)
router.get('/:id',IsAuth,positions.getPositionsById)

router.post('/',IsAuth,positions.createPositions)
router.put('/:id',IsAuth,positions.updatePositions)
router.delete('/:id',IsAuth,positions.deletePositions)


module.exports = router