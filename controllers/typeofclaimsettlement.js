const Typeofclaimsettlements = require('../models/typeofclaimsettlement')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getTypeofclaimsettlement= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Typeofclaimsettlements.find().countDocuments()
     const data = await Typeofclaimsettlements.find().skip((page-1)*counts).limit(counts)
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

exports.getTypeofclaimsettlementById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Typeofclaimsettlements.findById(AgesId)
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

exports.createTypeofclaimsettlement = async(req,res,next)=>{
    const name = req.body.name
    
    const result = new Typeofclaimsettlements({
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

exports.updateTypeofclaimsettlement = async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name
    
    try {
    const result = await Typeofclaimsettlements.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
    // result.url=url
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

exports.deleteTypeofclaimsettlement = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Typeofclaimsettlements.findById(AgesId)
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
    const data=await Typeofclaimsettlements.findByIdAndRemove(AgesId)
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