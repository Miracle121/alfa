const express = require('express')
const {body} = require('express-validator')
const mfy = require('../controllers/mfy')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,mfy.getMfy)
router.get('/:id',IsAuth,mfy.getMfyById)
router.get('/regId/:id',IsAuth,mfy.getByRegId)
router.get('/distId/:id',IsAuth,mfy.getByDistId)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],mfy.createMfy)
router.put('/:id',IsAuth,mfy.updateMfy)
router.delete('/:id',IsAuth,mfy.deleteMfy)


module.exports = router