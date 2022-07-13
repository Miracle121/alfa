const express = require('express')
const {body} = require('express-validator')
const groupsofproducts = require('../controllers/subgroupofproducts')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,groupsofproducts.getSubgroupOfProducts)
router.get('/:id',IsAuth,groupsofproducts.getSubgroupOfProductsById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],groupsofproducts.createSubgroupOfProducts)
router.put('/:id',IsAuth,groupsofproducts.updateSubgroupOfProducts)
router.delete('/:id',IsAuth,groupsofproducts.deleteSubgroupOfProducts)

router.get('/filter/:id',IsAuth,groupsofproducts.filterByGroupsofproductId)


module.exports = router