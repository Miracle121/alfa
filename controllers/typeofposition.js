const Typeofposition = require('../models/typeofposition')
const {validationResult} = require('express-validator')

exports.getTypeofposition= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20 classesofproduct
    let totalItems
    try {
        totalItems = await Typeofposition.find().countDocuments()
        const data = await Typeofposition.find().skip((page-1)*counts).limit(counts)
         res.status(200).json({
         message:`Typeofposition of products`,
         data:data,
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

exports.getTypeofpositionId =async(req,res,next)=>{
    const classesId= req.params.id
    try {
        const data= await Typeofposition.findById(classesId)
        if(!data){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Typeofposition of products`,
            data:data
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createTypeofposition= async (req,res,next)=>{  
    let creator ;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name  
    const group =new Typeofposition({
        name: name,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Typeofposition of products`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateTypeofposition =async(req,res,next)=>{
    const groupsId= req.params.id
    const name = req.body.name     
    try {
    const groups = await Typeofposition.findById(groupsId)
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name 
    const classesofproduct = await groups.save()
    res.status(200).json({
        message:`Typeofposition of products`,
        data: classesofproduct
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

exports.deleteTypeofposition = async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const deleteddata = await Typeofposition.findById(subgroupsId)
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
    const data=await Typeofposition.findByIdAndRemove(subgroupsId)     
    res.status(200).json({
        message:'Classe of products',
        data:data
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}

