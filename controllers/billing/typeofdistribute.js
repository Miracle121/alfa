const Typeofdistribute = require('../../models/billing/typeofdistribute')
const {validationResult} = require('express-validator')

exports.getTypeofdistributes= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Typeofdistribute.find().countDocuments()
     const data = await Typeofdistribute.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Type of distributes list`,
         data:data,
         totalItems:totalItems
     })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    } 
}

exports.getTypeofdistributesById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Typeofdistribute.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Type of distributes list`,
            data:result
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createTypeofdistributes = async(req,res,next)=>{
    const nameofoperations = req.body.nameofoperations
    const debt_account_ID= req.body.debt_account_ID    
    const cred_account_ID= req.body.cred_account_ID   
    const result = new Typeofdistribute({
        nameofoperations:nameofoperations,
        debt_account_ID:debt_account_ID,
        cred_account_ID:cred_account_ID,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message:`Type of distributes list`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updateTypeofdistributes= async(req,res,next)=>{ 
    const AgesId = req.params.id
    const nameofoperations = req.body.nameofoperations
    const debt_account_ID= req.body.debt_account_ID  
    const cred_account_ID= req.body.cred_account_ID  
    try {
    const result = await Typeofdistribute.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.nameofoperations= nameofoperations
    result.debt_account_ID=debt_account_ID
    result.cred_account_ID=cred_account_ID
 
    const data =await result.save()  
    res.status(200).json({
        message:`Type of distributes list`,
        data: data
    })
    } catch (err) {
        if(!err.statusCode){
            const error = new Error('Intenall error11111')
            error.statusCode = 500
            throw error
        }
        next(err)
    }
}

exports.deleteTypeofdistributes = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Typeofdistribute.findById(AgesId)
    if(!deleteddata){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    if(deleteddata.creatorId.toString()!==req.userId){
        const error = new Error('bu userni ochirishga imkoni yoq')
        error.statusCode =403
        throw error
    }
    const data=await Typeofdistribute.findByIdAndRemove(AgesId)
    res.status(200).json({
        message:'Accountroles is deleted',
        data:data   
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}