const Classesofproduct = require('../models/classes')
const {validationResult} = require('express-validator')

exports.getClassesofproduct= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20 classesofproduct
    let totalItems
    try {
        totalItems = await Classesofproduct.find().countDocuments()
        const classesofproduct = await Classesofproduct.find().skip((page-1)*counts).limit(counts)
         res.status(200).json({
         message:`Classe of products`,
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

exports.getClassesofproductId =async(req,res,next)=>{
    const classesId= req.params.id
    try {
        const classesofproduct= await Classesofproduct.findById(classesId)
        if(!classesofproduct){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Classe of products`,
            data:classesofproduct
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createClassesofproduct= async (req,res,next)=>{  
    let creator ;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name
    const color = req.body.color
      
    const group =new Classesofproduct({
        name: name,
        color:color,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Classe of products`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateClassesofproduct =async(req,res,next)=>{
    const groupsId= req.params.id
    const name = req.body.name   
    const coolers = req.body.coolers 
   
    try {
    const groups = await Classesofproduct.findById(groupsId)
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name 
    groups.coolers=coolers  
    const classesofproduct = await groups.save()
    res.status(200).json({
        message:`Classe of products`,
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

exports.deleteClassesofproduct = async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const deleteddata = await Classesofproduct.findById(subgroupsId)
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
    const data=await Classesofproduct.findByIdAndRemove(subgroupsId)     
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

