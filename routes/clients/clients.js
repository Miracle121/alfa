const express = require('express')
const {body} = require('express-validator')
const clients = require('../../controllers/clients/clients')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,clients.getClients)
router.get('/:id',IsAuth,clients.getClientsById)

router.post('/',IsAuth,clients.createClients)
router.put('/:id',IsAuth,clients.updateClients)
router.delete('/:id',IsAuth,clients.deleteClients)
router.get('/f/inn',IsAuth,clients.getClientsByInn)


module.exports = router