const Groupsofproducts = require('../models/groupsofproducts')
const {validationResult} = require('express-validator')

exports.getGroupsofProducts= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
    totalItems = await Groupsofproducts.find().countDocuments()
     const groups = await Groupsofproducts.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Groups of products`,
         data:groups,
         totalItems:totalItems
     })
    } catch (err)
     {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    } 
}

exports.getGroupsofProductsById =async(req,res,next)=>{
    const groupsId= req.params.id
    try {
        const groups= await Groupsofproducts.findById(groupsId)
        if(!groups){
            err.statusCode =404
        }
        res.status(200).json({
            message:`ma'lumotlar topildi`,
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

exports.createGroupsofProducts= async (req,res,next)=>{  
    let creator ;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name   
    const group =new Groupsofproducts({
        name: name,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`ma'lumotlar kiritildi`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateGroupsofProducts =async(req,res,next)=>{

    const groupsId= req.params.id
    const name = req.body.name
    
    try {
    const groups = await Groupsofproducts.findById(groupsId)
    
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name
  
    const groupsofpr = await groups.save()
    res.status(200).json({
        message:`Groups data changed`,
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

exports.deleteGroupsofProducts = async(req,res,next)=>{
    const groupsId= req.params.id
    try {
        const deleteddata = await Groupsofproducts.findById(groupsId)
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
    const data=await Groupsofproducts.findByIdAndRemove(groupsId)
     
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

