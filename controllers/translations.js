const Translations = require('../models/translations')
const {validationResult} = require('express-validator')

exports.getTranslations= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20 classesofproduct
    let totalItems
    try {
        totalItems = await Translations.find().countDocuments()
        const classesofproduct = await Translations.find().skip((page-1)*counts).limit(counts)
         res.status(200).json({
         message:`Translations of products`,
         data:classesofproduct,
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

exports.getTranslationsId =async(req,res,next)=>{
    const translationsId= req.params.id
   
    try {
        const translations= await Translations.findById(translationsId)   //find({},['key',translationsId])
        if(!translations){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Translations of products`,
            data:translations
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createTranslations= async (req,res,next)=>{  
    let creator ;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }      
        let keys = Object.keys(req.body)      
    const key =req.body[keys[0]] //req.body.key   
    const uz = null// req.body.uz
    const ru = null//req.body.ru
    const eng =null// req.body.eng     
    const group =new Translations({
        key: key,
        uz:uz,
        ru:ru,
        eng:eng,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Translations of products`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateTranslations =async(req,res,next)=>{
    const translationsId= req.params.id
    const key = req.body.key
    const uz = req.body.uz
    const ru = req.body.ru
    const eng = req.body.eng
   
    try {
    const groups = await Translations.findById(translationsId)
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.key= key 
    groups.uz= uz 
    groups.ru= ru
    groups.eng= eng  
   
    const data = await groups.save()
    res.status(200).json({
        message:`Translations of products`,
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

exports.deleteTranslations = async(req,res,next)=>{
    const subgroupsId= req.params.id
    try {
        const deleteddata = await Translations.findById(subgroupsId)
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
    const data=await Translations.findByIdAndRemove(subgroupsId)     
    res.status(200).json({
        message:'Classe of products',
        data:data
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}

exports.getByLanguages = async(req,res,next)=>{

    const lan = req.params.id
  
    try {
        const translations= await Translations.find({},['key',lan])
        if(!translations){
            err.statusCode =404
        }
        let obj = {}
        translations.forEach((translation) =>{
            delete _id;
            obj[translation.key] = translation[lan]
        })
        res.status(200).json(         
           obj
        )
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }


}

