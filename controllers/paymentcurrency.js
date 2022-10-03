const Paymentcurrency = require('../models/paymentcurrency')
const {validationResult} = require('express-validator')

exports.getPaymentcurrency= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Paymentcurrency.find().countDocuments()
        const typeofpayment = await Paymentcurrency.find().skip((page-1)*counts).limit(counts)
         res.status(200).json({
         message:`List of Paymentcurrency`,
         data: typeofpayment,
         totalItems:totalItems
     })
    } 
    catch (err)
     {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    } 
}

exports.getPaymentcurrencyId =async(req,res,next)=>{
    const typeofpaymentId= req.params.id
    try {
        const typeofpayment= await Paymentcurrency.findById(typeofpaymentId)
        if(!typeofpayment){
            err.statusCode =404
        }
        res.status(200).json({
            message:`List of police`,
            data: typeofpayment
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createPaymentcurrency= async (req,res,next)=>{      
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name     
    const group =new Paymentcurrency({
        name: name,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Police added`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updatePaymentcurrency =async(req,res,next)=>{
    const typeofriskId= req.params.id
    const name = req.body.name    
    try {
    const groups = await Paymentcurrency.findById(typeofriskId)
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name  
    const typeofrisk = await groups.save()
    res.status(200).json({
        message:`Police added`,
        data: typeofrisk
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

exports.deletePaymentcurrency = async(req,res,next)=>{
    const typeofpaymentId= req.params.id
    try {
        const deleteddata = await Paymentcurrency.findById(typeofpaymentId)
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
    const data=await Paymentcurrency.findByIdAndRemove(typeofpaymentId)     
    res.status(200).json({
        message:'Risks is deleted',
        data:data
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}

