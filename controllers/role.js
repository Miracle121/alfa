const Role = require('../models/role')
const {validationResult} = require('express-validator')

exports.getRole= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Role.find().countDocuments()
        const roles = await Role.find().skip((page-1)*counts).limit(counts)
         res.status(200).json({
         message:`Roles list`,
         data:roles,
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

exports.getRoleId =async(req,res,next)=>{
    const roleId= req.params.id
    try {
        const roles= await Role.findById(roleId)
        if(!roles){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Roles list`,
            data:roles
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createRole= async (req,res,next)=>{  
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name
      
    const group =new Role({
        name: name,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Role addes`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateRole =async(req,res,next)=>{
    const groupsId= req.params.id
    const name = req.body.name    
   
    try {
    const groups = await Role.findById(groupsId)
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name   
    const groupsofpr = await groups.save()
    res.status(200).json({
        message:`Role is changed`,
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

exports.deleteRole = async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const deleteddata = await Role.findById(subgroupsId)
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
    const data=await Role.findByIdAndRemove(subgroupsId)     
    res.status(200).json({
        message:'Role deleted',
        data:data
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}

