const express = require('express')
const {body} = require('express-validator')
const contract = require('../controllers/contract')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,contract.getContractform)
router.get('/:id',IsAuth,contract.getContractformById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],contract.createContractform)
router.put('/:id',IsAuth,contract.updateContractform)
router.delete('/:id',IsAuth,contract.deleteContractform)


module.exports = router