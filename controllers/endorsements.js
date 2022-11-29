const Endorsements = require('../models/endorsements')
const Agreements = require('../models/agreements')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getEndorsements= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Endorsements.find().countDocuments()
     const data = await Endorsements
        .find()
        .populate('agreementsId','agreementsnumber')
        .populate('typeofendorsements','name')
        .populate('statusofendorsements','name')
        .skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Endorsements list`,
         data:data,
         totalItems:totalItems
     })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    } 
}

exports.getEndorsementsById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Endorsements.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Endorsements list`,
            data:result
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createEndorsements = async(req,res,next)=>{
    
    const agreementsId = req.body.agreementsId  
    const typeofendorsements= req.body.typeofendorsements
    const reqforconclusion = req.body.reqforconclusion
    const endorsementsinfo = req.body.endorsementsinfo
    const statusofendorsements = req.body.statusofendorsements

    const resultagreements = await Agreements.findById(agreementsId)

    const result = new Endorsements({
        agreementsId:agreementsId,
        typeofendorsements:typeofendorsements,
        reqforconclusion:reqforconclusion,
        endorsementsinfo:endorsementsinfo,
        statusofendorsements:statusofendorsements,      
        creatorId: req.userId
    })
    const results = await result.save()
    resultagreements.policy= results._id
    const data =await resultagreements.save()  

    res.status(200).json({
        message:`Endorsements added`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updateEndorsements= async(req,res,next)=>{ 
    const AgesId = req.params.id
    const agreementsId = req.body.agreementsId  
    const typeofendorsements= req.body.typeofendorsements
    const reqforconclusion = req.body.reqforconclusion
    const endorsementsinfo = req.body.endorsementsinfo
    const statusofendorsements = req.body.statusofendorsements

    
    try {
    const result = await Endorsements.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
 
    const data =await result.save()  
    res.status(200).json({
        message:`Accountstatus changed`,
        data: data
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

exports.deleteEndorsements = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Endorsements.findById(AgesId)
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
    const data=await Endorsements.findByIdAndRemove(AgesId)
    res.status(200).json({
        message:'Accountroles is deleted',
        data:data   
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}