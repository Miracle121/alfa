const express = require('express')

const bcoinpolicyblank = require('../../controllers/bco/bcoinpolicyblank')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,bcoinpolicyblank.getBcoinpolicyblank)
router.get('/:id',IsAuth,bcoinpolicyblank.getBcoinpolicyblankById)

router.post('/',IsAuth,bcoinpolicyblank.createBcoinpolicyblank)
router.put('/:id',IsAuth,bcoinpolicyblank.updateBcoinpolicyblank)
router.delete('/:id',IsAuth,bcoinpolicyblank.deleteBcoinpolicyblank)


module.exports = router