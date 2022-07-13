const express = require('express')
const {body} = require('express-validator')
const regions = require('../controllers/regions')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,regions.getRegions)
router.get('/:id',IsAuth,regions.getRegionsById)
router.post('/',IsAuth,[
    body('name')
    .trim()
    .isLength({min:3})
],regions.createRegions)
router.put('/:id',IsAuth,regions.updateRegions)
router.delete('/:id',IsAuth,regions.deleteRegions)

module.exports = router