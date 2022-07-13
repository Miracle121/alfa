const Subgroupofproducts = require('../models/subgroupofproducts')
const {validationResult} = require('express-validator')

exports.getSubgroupOfProducts= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
    totalItems = await Subgroupofproducts.find().countDocuments()
     const subgroups = await Subgroupofproducts.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`SubGroups of products`,
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

exports.getSubgroupOfProductsById =async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const groups= await Subgroupofproducts.findById(subgroupsId)
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

exports.createSubgroupOfProducts= async (req,res,next)=>{  
    let creator ;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name
    const groupId = req.body.groupId   
    const group =new Subgroupofproducts({
        name: name,
        groupId: groupId,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`ma'lumotlar kiritildi`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateSubgroupOfProducts =async(req,res,next)=>{
    const groupsId= req.params.id
    const name = req.body.name    
    const groupId = req.body.groupId
    try {
    const groups = await Subgroupofproducts.findById(groupsId)
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name
    groups.groupsId =groupId
    const groupsofpr = await groups.save()
    res.status(200).json({
        message:`Sub-Groups data changed`,
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

exports.deleteSubgroupOfProducts = async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const deleteddata = await Subgroupofproducts.findById(subgroupsId)
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
    const data=await Subgroupofproducts.findByIdAndRemove(subgroupsId)     
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

exports.filterByGroupsofproductId= async(req,res,next)=>{
    const groupsId= req.params.id
    try {
        const groups= await Subgroupofproducts.find({"groupId":groupsId})
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
