const express = require('express')

const warehouse = require('../../controllers/bco/warehouse')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,warehouse.getWarehouse)
router.get('/:id',IsAuth,warehouse.getWarehouseById)

router.post('/',IsAuth,warehouse.createWarehouse)
router.put('/:id',IsAuth,warehouse.updateWarehouse)
router.delete('/:id',IsAuth,warehouse.deleteWarehouse)
router.get('/f/:id',IsAuth,warehouse.getPolicyblanknumberByTypeId)


module.exports = router