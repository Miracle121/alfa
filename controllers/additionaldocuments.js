const Additionaldocuments = require('../models/additionaldocuments')
const User = require('../models/users')
const {validationResult} = require('express-validator')
const uploadFile = require("../middleware/upload");
const fs = require('fs')

//==========================================================
exports.getadditionaldocuments= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Additionaldocuments.find().countDocuments()
     const data = await Additionaldocuments.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Additional documents form docs`,
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
exports.getAdditionaldocumentsById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Additionaldocuments.findById(AgesId)
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
exports.createAdditionaldocuments = async(req,res,next)=>{    
    const directoryPath = __basedir + "/uploads/";
    try {
      await uploadFile(req, res);
      if (req.file == undefined) {
         res.status(400).send({ message: "Please upload a file!" });
      }
      const name = req.file.originalname  //req.body.name
      const url= directoryPath+name //req.body.url  
      
      console.log(name);
   
      const result = new Additionaldocuments({
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
    //   res.status(200).send({
    //     message: "Uploaded the file successfully: " + req.file.originalname,
    //   });
        
    } catch (error) {
      console.log(error);
      
       res.status(400).json({message:error});
    }  
}
exports.updateAdditionaldocuments = async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.file.originalname  //req.body.name
    const url= directoryPath+name //req.body.url 
    try {
    const result = await Additionaldocuments.findById(AgesId)
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
exports.deleteAdditionaldocuments = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Additionaldocuments.findById(AgesId)
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
    const data=await Additionaldocuments.findByIdAndRemove(AgesId)
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
//=======================================================================
 exports.upload = async (req, res) => {
   
    try {
      await uploadFile(req, res);
      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    } catch (err) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
  };
  exports.getListFiles = (req, res) => {
    const directoryPath = __basedir + "/uploads/";
    console.log(directoryPath);
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
      let fileInfos = [];
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: directoryPath + file,
        });
      });
      res.status(200).send(fileInfos);
    });
  };
  exports.download = (req, res) => {
      
    const fileName = req.params.name;
    const directoryPath = __basedir + "/uploads/";
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  };