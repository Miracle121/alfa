const Statusofproducts = require('../models/statusofproduct')
const {validationResult} = require('express-validator')

exports.getStatusOfProduct= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
    totalItems = await Statusofproducts.find().countDocuments()
     const statusofproduct = await Statusofproducts.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Status of products`,
         data:statusofproduct,
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

exports.getStatusOfProductById =async(req,res,next)=>{
    const statusID= req.params.id
    try {
        const groups= await Statusofproducts.findById(statusID)
        if(!groups){
            err.statusCode =404
        }
        res.status(200).json({
            message:`ma'lumotlar topildi`,
            statusofproduct:groups
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createStatusOfProduct= async (req,res,next)=>{  
    let creator ;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name  
    const group =new Statusofproducts({
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

exports.updateStatusOfProduct =async(req,res,next)=>{
    const groupsId= req.params.id
    const name = req.body.name       
    try {
    const groups = await Statusofproducts.findById(groupsId)
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name
    const groupsofpr = await groups.save()
    res.status(200).json({
        message:`Status of product  changed`,
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

exports.deleteStatusOfProduct = async(req,res,next)=>{
    const statusId= req.params.id
    try {
        const deleteddata = await Statusofproducts.findById(statusId)
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
    const data=await Statusofproducts.findByIdAndRemove(statusId)     
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

