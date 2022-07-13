const Typeofpolice = require('../models/typeofpolice')
const {validationResult} = require('express-validator')

exports.getTypeofpolice= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Typeofpolice.find().countDocuments()
        const typeofpolice = await Typeofpolice.find().skip((page-1)*counts).limit(counts)
         res.status(200).json({
         message:`List of police`,
         data: typeofpolice,
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

exports.getTypeofpoliceId =async(req,res,next)=>{
    const typeofpoliceId= req.params.id
    try {
        const typeofpolice= await Typeofpolice.findById(typeofpoliceId)
        if(!typeofpolice){
            err.statusCode =404
        }
        res.status(200).json({
            message:`List of police`,
            data: typeofpolice
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createTypeofpolice= async (req,res,next)=>{      
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name     
    const group =new Typeofpolice({
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

exports.updateTypeofpolice =async(req,res,next)=>{
    const typeofriskId= req.params.id
    const name = req.body.name    
    try {
    const groups = await Typeofpolice.findById(typeofriskId)
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

exports.deleteTypeofpolice = async(req,res,next)=>{
    const typeofrisksId= req.params.id
    try {
        const deleteddata = await Typeofpolice.findById(typeofrisksId)
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
    const data=await Typeofpolice.findByIdAndRemove(typeofrisksId)     
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

