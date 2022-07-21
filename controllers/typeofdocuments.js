const Typeofdocuments = require('../models/typeofdocuments')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getTypeofdocuments= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Typeofdocuments.find().countDocuments()
     const position = await Typeofdocuments.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Typeofdocuments List`,
         data:position,
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

exports.getTypeofdocumentsById = async(req,res,next)=>{
    const positionId= req.params.id
    try {
        const position= await Typeofdocuments.findById(positionId)
        if(!position){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Position List`,
            data:position
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createTypeofdocuments = async(req,res,next)=>{
    const name = req.body.name
    const position = new Typeofdocuments({
        name:name,
        creatorId: req.userId
    })
    const positions = await position.save()
    res.status(200).json({
        message:`Position List`,
        data: positions,
        creatorId: req.userId,
    })
}


exports.updateTypeofdocuments = async(req,res,next)=>{ 
    const positionId = req.params.id
    const name = req.body.name
    try {
    const position = await Typeofdocuments.findById(positionId)
    if(!position){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    position.name= name
  
    const data =await position.save()  
    res.status(200).json({
        message:`ma'lumotlar o'zgartirildi`,
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

exports.deleteTypeofdocuments = async(req,res,next)=>{
    const positionId= req.params.id
    try {
        const deleteddata = await Typeofdocuments.findById(positionId)
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
    const data=await Typeofdocuments.findByIdAndRemove(positionId)
    res.status(200).json({
        message:'Position is deletes',
        data:data
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}