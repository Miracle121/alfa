const jwt = require('jsonwebtoken')
module.exports = (req,res,next)=>{
    let token
    const header = req.get('auth')
    if(!header){
        const err = new Error('Token is not exist')
        err.statusCode =401
        throw err
    }
    let decodedToken 
        try {
            decodedToken = jwt.verify(header,'testtest!@#123')
        } catch (err) {
            err.statusCode =401
            throw err
        }
        if(!decodedToken){
            const err = new Error('Not authentification')
             err.statusCode = 401
            throw err
        }
       
        req.userId = decodedToken.userId
        req.userrolse = decodedToken.userrolse
        req.userRegId = decodedToken.regionId
        req.userDestId = decodedToken.districtsId
        next()
}