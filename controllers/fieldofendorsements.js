const Fieldofendorsements = require('../models/fieldofendorsements')
const {validationResult} = require('express-validator')

exports.getFieldofendorsements= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Fieldofendorsements.find().countDocuments()
     const statusofendorsements = await Fieldofendorsements.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Field of endorsements`,
         data:statusofendorsements,
         totalItems:totalItems
     })
    } 
    catch (err){
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    } 
}

exports.getFieldofendorsementsById =async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const groups= await Fieldofendorsements.findById(subgroupsId)
        if(!groups){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Field of endorsements`,
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

exports.createFieldofendorsements= async (req,res,next)=>{  
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const typeofendorsements = req.body.typeofendorsements
    const nameoffield= req.body.nameoffield
    const filds = req.body.filds   
    const group =new Fieldofendorsements({
        typeofendorsements: typeofendorsements,
        nameoffield:nameoffield,
        filds: filds,        
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Field of endorsements`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateFieldofendorsements =async(req,res,next)=>{
    const groupsId= req.params.id
    const typeofendorsements = req.body.typeofendorsements 
    const titleoffield = req.body.titleoffield
    const nameoffield = req.body.nameoffield
    const typeoffield = req.body.typeoffield       
    try {
        const groups = await Fieldofendorsements.findById(groupsId)
        if(!groups){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
            }
    groups.typeofendorsements= typeofendorsements   
    groups.titleoffield= titleoffield  
    groups.nameoffield= nameoffield
    groups.typeoffield= typeoffield   
    const groupsofpr = await groups.save()
    res.status(200).json({
        message:`Field of endorsements`,
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

exports.deleteFieldofendorsements = async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const deleteddata = await Fieldofendorsements.findById(subgroupsId)
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
    const data=await Fieldofendorsements.findByIdAndRemove(subgroupsId)     
    res.status(200).json({
        message:`Field of endorsements`,
        data:data
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}

