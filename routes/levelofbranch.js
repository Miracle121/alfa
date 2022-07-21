const express = require('express')
const {body} = require('express-validator')
const levelofbranch = require('../controllers/levelofbranch')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,levelofbranch.getLevelofbranch)
router.get('/:id',IsAuth,levelofbranch.getLevelofbranchById)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],levelofbranch.createLevelofbranch)
router.put('/:id',IsAuth,levelofbranch.updateLevelofbranch)
router.delete('/:id',IsAuth,levelofbranch.deleteLevelofbranch)


module.exports = router