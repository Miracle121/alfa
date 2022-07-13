const Typeofsector = require('../models/typeofsector')
const {validationResult} = require('express-validator')

exports.getTypeofsector= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Typeofsector.find().countDocuments()
        const typeofsector = await Typeofsector.find().skip((page-1)*counts).limit(counts)
         res.status(200).json({
         message:`Type of sector`,
         data:typeofsector,
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

exports.getTypeofsectorId =async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const policyformats= await Typeofsector.findById(subgroupsId)
        if(!policyformats){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Type of sector`,
            data:policyformats
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createTypeofsector= async (req,res,next)=>{  
    let creator ;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name
      
    const group =new Typeofsector({
        name: name,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Type of sector added`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateTypeofsector =async(req,res,next)=>{
    const groupsId= req.params.id
    const name = req.body.name    
   
    try {
    const groups = await Typeofsector.findById(groupsId)
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name   
    const groupsofpr = await groups.save()
    res.status(200).json({
        message:`Type of sector changed`,
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

exports.deleteTypeofsector = async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const deleteddata = await Typeofsector.findById(subgroupsId)
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
    const data=await Typeofsector.findByIdAndRemove(subgroupsId)     
    res.status(200).json({
        message:'Type of sector',
        data:data
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}

