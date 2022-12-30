const express = require('express')

const acts = require('../../controllers/bco/acts')
const IsAuth = require('../../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,acts.getActs)
router.get('/:id',IsAuth,acts.getActsById)

router.post('/',IsAuth,acts.createActs)
router.put('/:id',IsAuth,acts.updateActs)
router.delete('/:id',IsAuth,acts.deleteActs)


module.exports = router