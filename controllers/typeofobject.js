const Typeofobject = require('../models/typeofobject')
const {validationResult} = require('express-validator')

exports.getTypeofobject= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Typeofobject.find().countDocuments()
        const typeofobject = await Typeofobject.find().skip((page-1)*counts).limit(counts)
         res.status(200).json({
         message:`Type of objects`,
         data: typeofobject,
         totalItems:totalItems
     })
    } 
    catch (err)
     {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    } 
}

exports.getTypeofobjectId =async(req,res,next)=>{
    const typeofobkectsId= req.params.id
    try {
        const typeofobject= await Typeofobject.findById(typeofobkectsId)
        if(!typeofobject){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Type of objects`,
            data: typeofobject
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createTypeofobject= async (req,res,next)=>{      
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name     
    const group =new Typeofobject({
        name: name,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Police added`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateTypeofobject =async(req,res,next)=>{
    const typeofobjectId= req.params.id
    const name = req.body.name    
    try {
    const groups = await Typeofobject.findById(typeofobjectId)
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name  
    const typeofrisk = await groups.save()
    res.status(200).json({
        message:`Police added`,
        data: typeofrisk
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

exports.deleteTypeofobject = async(req,res,next)=>{
    const typeofobjectsId= req.params.id
    try {
        const deleteddata = await Typeofobject.findById(typeofobjectsId)
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
    const data=await Typeofobject.findByIdAndRemove(typeofobjectsId)     
    res.status(200).json({
        message:'Risks is deleted',
        data:data
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}

