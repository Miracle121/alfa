const express = require('express')
const {body} = require('express-validator')
const breanches = require('../controllers/breanches')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,breanches.getBreanches)
router.get('/all',breanches.getAllBreanches)

router.get('/:id',IsAuth,breanches.getBreanchesById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],breanches.createBreanches)
router.put('/:id',IsAuth,breanches.updateBreanches)
router.delete('/:id',IsAuth,breanches.deleteBreanches)


module.exports = router