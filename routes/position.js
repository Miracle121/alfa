const express = require('express')
const {body} = require('express-validator')
const position = require('../controllers/position')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,position.getPosition)
router.get('/:id',IsAuth,position.getPositionById)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],position.createPosition)
router.put('/:id',IsAuth,position.updatePosition)
router.delete('/:id',IsAuth,position.deletePosition)


module.exports = router