const Position = require('../models/position')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getPosition= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Position.find().countDocuments()
     const position = await Position.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Position List`,
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

exports.getPositionById = async(req,res,next)=>{
    const positionId= req.params.id
    try {
        const position= await Position.findById(positionId)
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

exports.createPosition = async(req,res,next)=>{
    const name = req.body.name
    const position = new Position({
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


exports.updatePosition = async(req,res,next)=>{ 
    const positionId = req.params.id
    const name = req.body.name
    try {
    const position = await Position.findById(positionId)
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

exports.deletePosition = async(req,res,next)=>{
    const positionId= req.params.id
    try {
        const deleteddata = await Position.findById(positionId)
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
    const data=await Position.findByIdAndRemove(positionId)
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