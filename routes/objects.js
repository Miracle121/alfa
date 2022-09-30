const express = require('express')
const {body} = require('express-validator')
const objects = require('../controllers/objects')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,objects.getObject)
router.get('/:id',IsAuth,objects.getObjectId)
router.get('/type/:id',IsAuth,objects.getByTypeofObjectId)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],objects.createObject)
router.put('/:id',IsAuth,objects.updateObject)
router.delete('/:id',IsAuth,objects.deleteObject)


module.exports = router