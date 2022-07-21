const Districts = require('../models/districts')
const Region = require('../models/regions')
const Mfy = require('../models/mfy')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getDistricts= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
    totalItems = await Districts.find().countDocuments()
     const districts = await Districts.find().populate('regiId','name').skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Tumanlar yuborildi`,
         data:districts,
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

exports.getDistrictsById = async(req,res,next)=>{
    const regId= req.params.id
    try {
        const dist= await Districts.findById(regId).populate('regiId','name')
        if(!dist){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`ma'lumotlar topildi`,
            data:dist
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }

}

exports.getDistrictsByRegId = async(req,res,next)=>{
    const regId= req.params.id   
        try {
            const dist= await Districts.find({regiId:regId}).populate('regiId','name')
            if(!dist){
                const error = new Error('Object  not found')
                error.statusCode = 404
                throw error
            }
            res.status(200).json({
                message:`ma'lumotlar topildi`,
                data:dist
            })
        } catch (err) {
            if(!err.statusCode)
            {
                err.statusCode =500
            }
            next(err)
        } 
}

exports.createDistricts = async(req,res,next)=>{
    const name = req.body.name   
    const regiId = req.body.regiId   
    const dist = new Districts({
        name:name,
        regiId:regiId,
        creatorId: req.userId
    })
    const districts = await dist.save()
    const region = await Region.findById({_id:regiId})
    region.districts.push(districts)
    const reg = await  region.save()
    res.status(200).json({
        message:`ma'lumotlar kiritildi`,
        data: districts,
        creatorId:req.userId,
        reg: reg

    })
}

exports.updateDistricts = async(req,res,next)=>{
  
    const distId = req.params.id
    const name = req.body.name
    const regId =req.body.regiId
   
    try {
    const district = await Districts.findById(distId)
    if(!district){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    district.name= name
    district.regiId = regId
    const data =await district.save()
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

exports.deleteDistricts = async(req,res,next)=>{
    const destId= req.params.id
    try {
        const deleteddata = await Districts.findById(destId)
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

    const data=await Districts.findByIdAndRemove(destId)
    const regId = data.regiId.toString()
    const reg = await Region.findById(regId)
    reg.districts.pull(destId)
    const regsavedata = await reg.save()

    res.status(200).json({
        message:'Region is deletes',
        data:data,
        reg:regsavedata
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}