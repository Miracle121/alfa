const Applicationformdocs = require('../models/applicationformdocs')
const User = require('../models/users')
const {validationResult} = require('express-validator')
const uploadFile = require("../middleware/upload");

exports.getApplicationformdocs= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Applicationformdocs.find().countDocuments()
     const data = await Applicationformdocs.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Applications form docs`,
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

exports.getApplicationformdocsById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Applicationformdocs.findById(AgesId)
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

exports.createApplicationformdocs = async(req,res,next)=>{

    const directoryPath = __basedir + "/uploads/";
    try {
      await uploadFile(req, res);  
      if (req.file == undefined) {
         res.status(400).send({ message: "Please upload a file!" });
      }
      const name = req.file.originalname  //req.body.name
      const url= directoryPath+name //req.body.url  
      const result = new Applicationformdocs({
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

exports.updateApplicationformdocs = async(req,res,next)=>{ 
    const AgesId = req.params.id
     const name = req.file.originalname  //req.body.name
    const url= directoryPath+name //req.body.url 
    try {
    const result = await Applicationformdocs.findById(AgesId)
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

exports.deleteApplicationformdocs = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Applicationformdocs.findById(AgesId)
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
    const data=await Applicationformdocs.findByIdAndRemove(AgesId)
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