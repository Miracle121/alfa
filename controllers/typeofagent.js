const Typeofagent = require('../models/typeofagent')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getTypeofagent= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Typeofagent.find().countDocuments()
     const data = await Typeofagent.find()     
     .skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Type of agents`,
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

exports.getTypeofagentById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Typeofagent.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Type of agents`,
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

exports.createTypeofagent = async(req,res,next)=>{
    const name = req.body.name    
    const result = new Typeofagent({
        name:name,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message:`Type of agents`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updateTypeofagent = async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name
   
    try {
    const result = await Typeofagent.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
   
    const data =await result.save()  
    res.status(200).json({
        message:`Type of agents`,
        data: data
    })
    } catch (err) {
        if(!err.statusCode){
            const error = new Error('Intenall error')
            error.statusCode = 500
            throw error
        }
        next(err)
    }
}

exports.deleteTypeofagent = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Typeofagent.findById(AgesId)
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
    const data=await Typeofagent.findByIdAndRemove(AgesId)
    res.status(200).json({
        message:'Type of agents is deletes',
        data:data   
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}