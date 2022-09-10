const Policy = require('../models/policy')
const User = require('../models/users')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const  moment = require('moment')

exports.getPolicy= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Policy.find().countDocuments()
     const data = await Policy.find()    
     res.status(200).json({
         message:`Policy List`,
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

exports.getPolicyById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Policy.findById(AgesId)       
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Policy List`,
            data:result
        })
    } catch (err) {
       
        next(err)
    }
}

exports.createPolicy = async(req,res,next)=>{ 

    const agreementsId = req.body.agreementsId
    const policynumber = req.body.policynumber
    const formnumber = req.body.formnumber
    const dateofissue = moment(req.body.dateofissue,"DD/MM/YYYY")
    const copyofdocuments = req.body.copyofdocuments   
    try {
              
            const result = new Policy({    
                agreementsId:agreementsId,
                policynumber:policynumber,
                formnumber:formnumber,
                dateofissue:dateofissue,
                copyofdocuments:copyofdocuments,                      
                creatorId: req.userId
            })

            const results = await result.save()      
            res.status(200).json({
                message:`Policy List`,
                data: results,            
                creatorId: req.userId,
            })
             
    } catch (err) {
        next(err)
    }    
}

exports.updatePolicy= async(req,res,next)=>{ 
    
    const policyId = req.params.id
    const agreementsId = req.body.agreementsId
    const policynumber = req.body.policynumber
    const formnumber = req.body.formnumber
    const dateofissue = moment(req.body.dateofissue,"DD/MM/YYYY")
    const copyofdocuments = req.body.copyofdocuments 
    try {
    const result = await Policy.findById(policyId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }   
    result.agreementsId=agreementsId
    result.policynumber=policynumber
    result.formnumber=formnumber
    result.dateofissue=dateofissue
    result.copyofdocuments=copyofdocuments
    
    const data =await result.save()  
    res.status(200).json({
        message:`Agents List`,
        data: data
    })
    } 
    catch (err) {
    
        next(err)
    }
}

exports.deletePolicy = async(req,res,next)=>{
 
    const AgesId= req.params.id
   
    try {
        const deleteddata = await Policy.findById(AgesId)
        const userdata = await User.find({"agentId":AgesId})        
    if(!deleteddata){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error    }
    if(deleteddata.creatorId.toString()!==req.userId){
        const error = new Error('bu userni ochirishga imkoni yoq')
        error.statusCode =403
        throw error
        }
    const data=await Policy.findByIdAndRemove(AgesId)
    const usersdata=await User.findByIdAndRemove(userdata) 
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