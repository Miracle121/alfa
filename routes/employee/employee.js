const express = require('express')
const employee = require('../../controllers/employee/employee')
const IsAuth = require('../../middleware/is-auth')
const uploadimages = require('../../middleware/uploadimages')
const router = express.Router()

router.get('/',IsAuth,employee.getEmployees)
router.get('/:id',IsAuth,employee.getEmployeesById)

router.post('/',IsAuth,uploadimages.single('files'),employee.createEmployees)
router.put('/:id',IsAuth,employee.updateEmployees)
router.delete('/:id',IsAuth,employee.deleteEmployeess)


module.exports = router