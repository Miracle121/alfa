const express = require('express')
const {body} = require('express-validator')
const auth = require('../controllers/auth')
const User = require('../models/users')

const router = express.Router()

router.post('/sinup',[
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
    
], auth.signupUsers )

router.post('/login',auth.login)



module.exports = router