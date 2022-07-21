const express = require('express')
const {body} = require('express-validator')
const breanchstatus = require('../controllers/breanchstatus')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,breanchstatus.getBreanchstatus)
router.get('/:id',IsAuth,breanchstatus.getBreanchstatusById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],breanchstatus.createBreanchstatus)
router.put('/:id',IsAuth,breanchstatus.updateBreanchstatus)
router.delete('/:id',IsAuth,breanchstatus.deleteBreanchstatus)


module.exports = router