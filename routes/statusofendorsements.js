const express = require('express')
const {body} = require('express-validator')
const statusofendorsements = require('../controllers/statusofendorsements')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,statusofendorsements.getStatusofendorsements)
router.get('/:id',IsAuth,statusofendorsements.getStatusofendorsementsById)

router.post('/',IsAuth,statusofendorsements.createStatusofendorsements)
router.put('/:id',IsAuth,statusofendorsements.updateStatusofendorsements)
router.delete('/:id',IsAuth,statusofendorsements.deleteStatusofendorsements)


module.exports = router