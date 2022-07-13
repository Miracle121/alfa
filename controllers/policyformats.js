const Policyformats = require('../models/policyformats')
const {validationResult} = require('express-validator')

exports.getPolicyformats= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
    totalItems = await Policyformats.find().countDocuments()
     const policyformats = await Policyformats.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Policy formats of products`,
         data:policyformats,
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

exports.getPolicyformatsId =async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const policyformats= await Policyformats.findById(subgroupsId)
        if(!policyformats){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Policy formats of products`,
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

exports.createPolicyformats= async (req,res,next)=>{  
    let creator ;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name
      
    const group =new Policyformats({
        name: name,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Policy formats add`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updatePolicyformats =async(req,res,next)=>{
    const groupsId= req.params.id
    const name = req.body.name    
   
    try {
    const groups = await Policyformats.findById(groupsId)
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name   
    const groupsofpr = await groups.save()
    res.status(200).json({
        message:`Policy formats of products changed`,
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

exports.deletePolicyformats = async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const deleteddata = await Policyformats.findById(subgroupsId)
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
    const data=await Policyformats.findByIdAndRemove(subgroupsId)     
    res.status(200).json({
        message:'Policy formats of products',
        data:data
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}

