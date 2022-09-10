const express = require('express')
const {body} = require('express-validator')
const reasons = require('../controllers/reasons')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,reasons.getReasons)
router.get('/:id',IsAuth,reasons.getReasonsId)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],reasons.createReasons)
router.put('/:id',IsAuth,reasons.updateReasons)
router.delete('/:id',IsAuth,reasons.deleteReasons)


module.exports = router