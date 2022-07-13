const Accountstatus = require('../models/accountstatus')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getAccountstatus= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Accountstatus.find().countDocuments()
     const data = await Accountstatus.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Accountstatus list`,
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

exports.getAccountstatusById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Accountstatus.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Accountstatus list`,
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

exports.createAccountstatus = async(req,res,next)=>{
    const name = req.body.name    
    const result = new Accountstatus({
        name:name,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message:`Accountstatus added`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updateAccountstatus= async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name
    
    try {
    const result = await Accountstatus.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
 
    const data =await result.save()  
    res.status(200).json({
        message:`Accountstatus changed`,
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

exports.deleteAccountstatus = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Accountstatus.findById(AgesId)
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
    const data=await Accountstatus.findByIdAndRemove(AgesId)
    res.status(200).json({
        message:'Accountstatus is deleted',
        data:data   
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}