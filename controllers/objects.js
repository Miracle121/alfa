const Objects = require('../models/objects')
const {validationResult} = require('express-validator')

exports.getObject= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Objects.find().countDocuments()
        const typeofobject = await Objects.find().skip((page-1)*counts).limit(counts)
         res.status(200).json({
         message:`Objects list`,
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

exports.getObjectId =async(req,res,next)=>{
    const objectId= req.params.id
    try {
        const objects= await Objects.findById(objectId)
        if(!objects){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Objects list`,
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

exports.createObject= async (req,res,next)=>{      
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name    
    const typobjectsId = req.body.typobjectsId 
    const group =new Objects({
        name: name,
        typobjectsId:typobjectsId,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Objects added`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateObject =async(req,res,next)=>{
    const typeofobjectId= req.params.id
    const name = req.body.name   
    const  typobjectsId = req.body.typobjectsId 
    try {
    const groups = await Objects.findById(typeofobjectId)
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name 
    groups.typobjectsId=typobjectsId 
    const typeofrisk = await groups.save()
    res.status(200).json({
        message:`Objects is changed`,
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

exports.deleteObject = async(req,res,next)=>{
    const objectsId= req.params.id
    try {
        const deleteddata = await Objects.findById(objectsId)
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
    const data=await Objects.findByIdAndRemove(objectsId)     
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

exports.getByTypeofObjectId =async(req,res,next)=>{    
    const typeId= req.params.id
    try {
        const objects= await Objects.find({typobjectsId:typeId}) //.populate('typobjectsId','name')
        if(!objects){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Objects list`,
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