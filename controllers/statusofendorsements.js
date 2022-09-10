const Statusofendorsements = require('../models/statusofendorsements')
const {validationResult} = require('express-validator')

exports.getStatusofendorsements= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Statusofendorsements.find().countDocuments()
     const statusofendorsements = await Statusofendorsements.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Statusofendorsements of products`,
         data:statusofendorsements,
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

exports.getStatusofendorsementsById =async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const groups= await Statusofendorsements.findById(subgroupsId)
        if(!groups){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Statusofendorsements list`,
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

exports.createStatusofendorsements= async (req,res,next)=>{  
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name
   
    const group =new Statusofendorsements({
        name: name,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Statusofendorsements list`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateStatusofendorsements =async(req,res,next)=>{
    const groupsId= req.params.id
    const name = req.body.name        
    try {
        const groups = await Statusofendorsements.findById(groupsId)
        if(!groups){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
            }
    groups.name= name   
    const groupsofpr = await groups.save()
    res.status(200).json({
        message:`Statusofendorsements list`,
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

exports.deleteStatusofendorsements = async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const deleteddata = await Statusofendorsements.findById(subgroupsId)
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
    const data=await Statusofendorsements.findByIdAndRemove(subgroupsId)     
    res.status(200).json({
        message:'Statusofendorsements is deletes',
        data:data
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}

