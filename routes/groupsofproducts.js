const express = require('express')
const {body} = require('express-validator')
const groupsofproducts = require('../controllers/groupsofproducts')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,groupsofproducts.getGroupsofProducts)
router.get('/:id',IsAuth,groupsofproducts.getGroupsofProductsById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],groupsofproducts.createGroupsofProducts)
router.put('/:id',IsAuth,groupsofproducts.updateGroupsofProducts)
router.delete('/:id',IsAuth,groupsofproducts.deleteGroupsofProducts)


module.exports = router