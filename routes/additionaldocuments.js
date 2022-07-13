const express = require('express')
const {body} = require('express-validator')
const additionaldocuments = require('../controllers/additionaldocuments')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,additionaldocuments.getadditionaldocuments)
router.get('/:id',IsAuth,additionaldocuments.getAdditionaldocumentsById)

router.post('/',IsAuth,additionaldocuments.createAdditionaldocuments)
router.put('/:id',IsAuth,additionaldocuments.updateAdditionaldocuments)
router.delete('/:id',IsAuth,additionaldocuments.deleteAdditionaldocuments)

// router.post('/',IsAuth,additionaldocuments.upload)
router.get('/files/:name',IsAuth,additionaldocuments.download)



module.exports = router