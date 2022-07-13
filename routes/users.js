const express = require('express')
const {body} = require('express-validator')
const User = require('../models/users')
const users = require('../controllers/users')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,users.getUsers)
router.get('/:id',IsAuth,users.getUsersById)
router.post('/',[
    body('email')
    .isEmail()
    .withMessage('iltimos email adress kiriting')
    .custom((value,{req})=>{
        return User.findOne({email:value})
        .then(userDoc=>{
            if(userDoc){
                return Promise.reject('E-mail bor')
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min:5})
    
],users.CreateUsers)
router.put('/:id',IsAuth,users.UpdateUsers)
router.delete('/:id',IsAuth,users.DeleteUsers)
router.get('/list/filter',IsAuth,users.UserFilter)
router.get('/list/search',IsAuth,users.Usersearch)


module.exports = router