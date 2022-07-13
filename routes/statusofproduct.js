const express = require('express')
const {body} = require('express-validator')
const statusofproduct = require('../controllers/statusofproduct')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,statusofproduct.getStatusOfProduct)
router.get('/:id',IsAuth,statusofproduct.getStatusOfProductById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],statusofproduct.createStatusOfProduct)
router.put('/:id',IsAuth,statusofproduct.updateStatusOfProduct)
router.delete('/:id',IsAuth,statusofproduct.deleteStatusOfProduct)


module.exports = router