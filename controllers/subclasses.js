const Subclasses = require('../models/subclasses')
const {validationResult} = require('express-validator')

exports.getSubClassesofproduct= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20 classesofproduct
    let totalItems
    try {
        totalItems = await Subclasses.find().countDocuments()
        const classesofproduct = await Subclasses.find().skip((page-1)*counts).limit(counts)
         res.status(200).json({
         message:`Subclasse of products`,
         data:classesofproduct,
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

exports.getSubClassesofproductId =async(req,res,next)=>{
    const classesId= req.params.id
    try {
        const classesofproduct= await Subclasses.findById(classesId)
        if(!classesofproduct){
            err.statusCode =404
        }
        res.status(200).json({
            message:`SubClasse of products`,
            data: classesofproduct
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createSubClassesofproduct= async (req,res,next)=>{  
    let creator ;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name
    const classesId = req.body.classId      
    const group =new Subclasses({
        name: name,
        classId:classesId,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`SubClasse of products`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateSubClassesofproduct =async(req,res,next)=>{
    const groupsId= req.params.id
    const name = req.body.name   
    const classesId = req.body.classId    
    try {
    const groups = await Subclasses.findById(groupsId)
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name 
    groups.classId= classesId
    const classesofproduct = await groups.save()
    res.status(200).json({
        message:`SubClasse of products`,
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

exports.deleteSubClassesofproduct = async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const deleteddata = await Subclasses.findById(subgroupsId)
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
    const data=await Subclasses.findByIdAndRemove(subgroupsId)     
    res.status(200).json({
        message:'SubClasse of products',
        data:data
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}

