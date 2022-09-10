const Typeofendorsements = require('../models/typeofendorsements')
const {validationResult} = require('express-validator')

exports.getTypeofendorsements= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Typeofendorsements.find().countDocuments()
     const subgroups = await Typeofendorsements.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Typeofendorsements of products`,
         data:subgroups,
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

exports.getTypeofendorsementsById =async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const groups= await Typeofendorsements.findById(subgroupsId)
        if(!groups){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Typeofendorsements list`,
            data:groups
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createTypeOfendorsements= async (req,res,next)=>{  
    let creator ;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name
   
    const group =new Typeofendorsements({
        name: name,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Typeofendorsements list`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateTypeofendorsements =async(req,res,next)=>{
    const groupsId= req.params.id
    const name = req.body.name    
    
    try {
    const groups = await Typeofendorsements.findById(groupsId)
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name
   
    const groupsofpr = await groups.save()
    res.status(200).json({
        message:`Typeofendorsements list`,
        data: groupsofpr
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

exports.deleteTypeOfendorsements = async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const deleteddata = await Typeofendorsements.findById(subgroupsId)
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
    const data=await Typeofendorsements.findByIdAndRemove(subgroupsId)     
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

