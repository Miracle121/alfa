const Contractform = require('../models/contractform')
const User = require('../models/users')
const {validationResult} = require('express-validator')
const uploadFile = require("../middleware/upload");
const fs = require('fs')


exports.getContractform= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Contractform.find().countDocuments()
     const data = await Contractform.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Contractform form docs`,
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

exports.getContractformById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Contractform.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`ma'lumotlar topildi`,
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

exports.createContractform = async(req,res,next)=>{
    const directoryPath = __basedir + "/uploads/";
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
           res.status(400).send({ message: "Please upload a file!" });
        }
        const name = req.file.originalname  //req.body.name
        const url= directoryPath+name //req.body.url  
        
        
     
        const result = new Contractform({
            name:name,
            url:url,
            creatorId: req.userId
        })
        const results = await result.save()
        res.status(200).json({
            message:`ma'lumotlar kiritildi`,
            data: results,
            creatorId: req.userId,
        })          
      } catch (error) {
        console.log(error);
        
         res.status(400).json({message:error});
      }  

}

exports.updateContractform = async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.file.originalname  //req.body.name
    const url= directoryPath+name //req.body.url  
    try {
    const result = await Contractform.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
    result.url=url
    const data =await result.save()  
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

exports.deleteContractform = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Contractform.findById(AgesId)
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
    const data=await Contractform.findByIdAndRemove(AgesId)
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