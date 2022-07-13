const express = require('express')
const {body} = require('express-validator')
const typeofagent = require('../controllers/typeofagent')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofagent.getTypeofagent)
router.get('/:id',IsAuth,typeofagent.getTypeofagentById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],typeofagent.createTypeofagent)
router.put('/:id',IsAuth,typeofagent.updateTypeofagent)
router.delete('/:id',IsAuth,typeofagent.deleteTypeofagent)


module.exports = router