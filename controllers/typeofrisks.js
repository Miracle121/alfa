const Typeofrisks = require('../models/typeofrisks')
const {validationResult} = require('express-validator')

exports.getTypeofrisks= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Typeofrisks.find().countDocuments()
        const typeofrisks = await Typeofrisks.find().skip((page-1)*counts).limit(counts)
         res.status(200).json({
         message:`Type of risks list`,
         data:typeofrisks,
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

exports.getTypeofrisksId =async(req,res,next)=>{
    const riskId= req.params.id
    try {
        const typeofrisk= await Typeofrisks.findById(riskId)
        if(!typeofrisk){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Type of risks list`,
            data:typeofrisk
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createTypeofrisks= async (req,res,next)=>{      
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name      
    const group =new Typeofrisks({
        name: name,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Type of risks list`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateTypeofrisks =async(req,res,next)=>{
    const typeofriskId= req.params.id
    const name = req.body.name       
    try {
    const groups = await Typeofrisks.findById(typeofriskId)
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name   
    const typeofrisk = await groups.save()
    res.status(200).json({
        message:`Type of risks list`,
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

exports.deleteTypeofrisks = async(req,res,next)=>{
    const typeofrisksId= req.params.id
    try {
        const deleteddata = await Typeofrisks.findById(typeofrisksId)
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
    const data=await Typeofrisks.findByIdAndRemove(typeofrisksId)     
    res.status(200).json({
        message:'Type of risks list',
        data:data
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}

