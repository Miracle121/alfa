const Typeofrefund = require('../models/typeofrefund')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getTypeofrefund= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Typeofrefund.find().countDocuments()
     const data = await Typeofrefund.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Typeofclaimsettlement documents form docs`,
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

exports.getTypeofrefundById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Typeofrefund.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`ma'lumotlar topildi`,
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

exports.createTypeofrefund = async(req,res,next)=>{
    const name = req.body.name
    
    const result = new Typeofrefund({
        name:name,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message:`ma'lumotlar kiritildi`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updateTypeofrefund = async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name
    
    try {
    const result = await Typeofrefund.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
 
    const data =await result.save()  
    res.status(200).json({
        message:`ma'lumotlar o'zgartirildi`,
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

exports.deleteTypeofrefund = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Typeofrefund.findById(AgesId)
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
    const data=await Typeofrefund.findByIdAndRemove(AgesId)
    res.status(200).json({
        message:'Region is deletes',
        data:data   
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}