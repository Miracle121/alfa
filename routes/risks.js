const express = require('express')
const {body} = require('express-validator')
const risks = require('../controllers/risks')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,risks.getRisks)
router.get('/:id',IsAuth,risks.getRisksId)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],risks.createRisks)
router.put('/:id',IsAuth,risks.updateRisks)
router.delete('/:id',IsAuth,risks.deleteRisks)
router.get('/typeofrisk/:id',IsAuth,risks.filteringByTypeofriskId)
router.get('/classesId/:id',IsAuth,risks.filteringByClasseId)

module.exports = router