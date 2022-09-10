const express = require('express')
const {body} = require('express-validator')
const typeofendorsements = require('../controllers/typeofendorsements')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofendorsements.getTypeofendorsements)
router.get('/:id',IsAuth,typeofendorsements.getTypeofendorsementsById)

router.post('/',IsAuth,typeofendorsements.createTypeOfendorsements)
router.put('/:id',IsAuth,typeofendorsements.updateTypeofendorsements)
router.delete('/:id',IsAuth,typeofendorsements.deleteTypeOfendorsements)


module.exports = router