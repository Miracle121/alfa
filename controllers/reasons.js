const Reasons = require('../models/reasons')
const {validationResult} = require('express-validator')

exports.getReasons= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Reasons.find().countDocuments()
        const typeofobject = await Reasons.find().skip((page-1)*counts).limit(counts)
         res.status(200).json({
         message:`Reasons list`,
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

exports.getReasonsId =async(req,res,next)=>{
    const objectId= req.params.id
    try {
        const objects= await Reasons.findById(objectId)
        if(!objects){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Reasons list`,
            data: objects
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createReasons= async (req,res,next)=>{      
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name    
    const group =new Reasons({
        name: name,       
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Reasons added`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateReasons =async(req,res,next)=>{
    const typeofobjectId= req.params.id
    const name = req.body.name       
    try {
    const groups = await Reasons.findById(typeofobjectId)
    if(!groups){
        const error = new Error('Reasons  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name   
    const typeofrisk = await groups.save()
    res.status(200).json({
        message:`Reasons is changed`,
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

exports.deleteReasons = async(req,res,next)=>{
    const objectsId= req.params.id
    try {
        const deleteddata = await Reasons.findById(objectsId)
    if(!deleteddata){
        const error = new Error('Reasons  not found')
        error.statusCode = 404
        throw error
    }
    if(deleteddata.creatorId.toString()!==req.userId){
        const error = new Error('bu userni ochirishga imkoni yoq')
        error.statusCode =403
        throw error
    }
    const data=await Reasons.findByIdAndRemove(objectsId)     
    res.status(200).json({
        message:'Reasons is deleted',
        data:data
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}

