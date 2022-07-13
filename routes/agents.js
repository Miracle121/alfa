const express = require('express')
const {body} = require('express-validator')
const agents = require('../controllers/agents')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,agents.getAgents)
router.get('/:id',IsAuth,agents.getAgentsById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],agents.createAgents)
router.put('/:id',IsAuth,agents.updateAgents)
router.delete('/:id',IsAuth,agents.deleteAgents)


module.exports = router