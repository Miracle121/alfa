const express = require('express')
const {body} = require('express-validator')
const endorsements = require('../controllers/endorsements')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,endorsements.getEndorsements)
router.get('/:id',IsAuth,endorsements.getEndorsementsById)

router.post('/',IsAuth,endorsements.createEndorsements)
router.put('/:id',IsAuth,endorsements.updateEndorsements)
router.delete('/:id',IsAuth,endorsements.deleteEndorsements)
router.get('/f/:id',IsAuth,endorsements.getEndorsementsByAgreementId)


module.exports = router