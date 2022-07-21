const Breanchstatus = require('../models/breanchstatus')
const User = require('../models/users')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

exports.getBreanchstatus= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Breanchstatus.find().countDocuments()
     const data = await Breanchstatus.find()    
     .skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Breanchstatus List`,
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

exports.getBreanchstatusById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Breanchstatus.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Breanchstatus List`,
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

exports.createBreanchstatus = async(req,res,next)=>{     
    const name = req.body.name
    try {
        const result = new Breanchstatus({   
            name:name,             
            creatorId: req.userId
        })
        const results = await result.save()      
        res.status(200).json({
            message:`Breanchstatus List`,
            data: results,            
            creatorId: req.userId,
        })
    } catch (err) {
        if(!err.statusCode){
            const err = new Error('Agentni qoshishda xatolik')
            err.statusCode = 500
            throw err
        }
        next(err)
    }    
}

exports.updateBreanchstatus= async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name    
    try {
    const result = await Breanchstatus.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }   
    result.name=name   
    const data =await result.save()  
    res.status(200).json({
        message:`Breanchstatus List`,
        data: data
    })
    } 
    catch (err) {
        if(!err.statusCode){
            const error = new Error('Intenall error11111')
            error.statusCode = 500
            throw error
        }
        next(err)
    }
}

exports.deleteBreanchstatus = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Breanchstatus.findById(AgesId)
            
    if(!deleteddata){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error    }
    if(deleteddata.creatorId.toString()!==req.userId){
        const error = new Error('bu userni ochirishga imkoni yoq')
        error.statusCode =403
        throw error
        }
    const data=await Breanchstatus.findByIdAndRemove(AgesId)
    const usersdata=await User.findByIdAndRemove(userdata) 
    res.status(200).json({
        message:'Breanchstatus is deletes',
        data:data   
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}