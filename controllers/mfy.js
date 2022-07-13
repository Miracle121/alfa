const Districts = require('../models/districts')
const Mfy = require('../models/mfy')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getMfy= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Mfy.find().countDocuments()
     const mfy = await Mfy.find()
     .populate('regionId','name')
     .populate('districtId','name')
     .skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Viloyatlar yuborildi`,
         data:mfy,
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

exports.getByRegId = async (req,res,next)=>{
    const regId= req.params.id
    try {
        const mfy= await Mfy.find({regionId:regId})
        .populate('regionId','name')
        .populate('districtId','name')
        if(!mfy){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`ma'lumotlar topildi`,
            data:mfy
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}
exports.getByDistId = async (req,res,next)=>{
    const distId= req.params.id
    try {
        const mfy= await Mfy.find({districtId:distId})
        .populate('regionId','name')
        .populate('districtId','name')
        if(!mfy){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`ma'lumotlar topildi`,
            data:mfy
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.getMfyById = async(req,res,next)=>{
    const mfyId= req.params.id
    try {
        const mfy= await Mfy.findById(mfyId)
        .populate('regionId','name')
        .populate('districtId','name')
        if(!mfy){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`ma'lumotlar topildi`,
            data:mfy
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createMfy = async(req,res,next)=>{
    const name = req.body.name
    const regionId = req.body.regionId
    const districtId = req.body.districtId
    const mahalla = new Mfy({
        name:name,
        regionId:regionId,
        districtId:districtId,
        creatorId: req.userId
    })
    const mfy = await mahalla.save()
    const dist = await Districts.findById({_id:districtId})
    dist.mfy.push(mfy._id)
    const district = await dist.save()
    res.status(200).json({
        message:`ma'lumotlar kiritildi`,
        data: mfy,
        district:district,
        creatorId: req.userId,
    })
}
exports.updateMfy = async(req,res,next)=>{ 
    const mfyId = req.params.id
    const name = req.body.name
    const regionId =req.body.regionId
    const districtId = req.body.districtId
    try {
    const mfy = await Mfy.findById(mfyId)
    if(!mfy){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    mfy.name= name
    mfy.regionId = regionId
    mfy.districtId = districtId
    const data =await mfy.save()  
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

exports.deleteMfy = async(req,res,next)=>{
    const mfyId= req.params.id
    try {
        const deleteddata = await Mfy.findById(mfyId)
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
    const data=await Mfy.findByIdAndRemove(mfyId)
    const districtId = data.districtId.toString()
    const dist = await Districts.findById(districtId)
    dist.mfy.pull(mfyId)
    const ds = await dist.save() 
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