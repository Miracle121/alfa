const express = require('express')
const {body} = require('express-validator')
const agreements = require('../controllers/agreements')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,agreements.getAgreements)
router.get('/:id',IsAuth,agreements.getAgreementsById)

router.post('/',IsAuth,agreements.createAgreements)
router.put('/:id',IsAuth,agreements.updateAgreements)
router.delete('/:id',IsAuth,agreements.deleteAgreements)

router.post('/agentsfilter',IsAuth,agreements.findebyquery)


module.exports = router