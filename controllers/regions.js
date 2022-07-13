const Region = require('../models/regions')
const Districts = require('../models/districts')
const {validationResult} = require('express-validator')

exports.getRegions= async(req,res,next)=>{
    const page = req.query.page ||1
    // console.log(page);
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
    totalItems = await Region.find().countDocuments()
     const region = await Region.find().populate('districts','name').skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Viloyatlar yuborildi`,
         data:region,
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

exports.getRegionsById =async(req,res,next)=>{
    const regId= req.params.id
    try {
        const region= await Region.findById(regId)
        if(!region){
            err.statusCode =404
        }
        res.status(200).json({
            message:`ma'lumotlar topildi`,
            data:region
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }

    // .then(region=>{
    //     res.status(200).json({
    //         message:`ma'lumotlar topildi`,
    //         region:region
    //     })
    // })
    // .catch(err=>{
    //     if(!err.statusCode){
    //         err.statusCode =500
    //     }
    //     next(err)
    // })
}

exports.createRegions= async (req,res,next)=>{  
    let creator ;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name
    const reg =new Region({
        name: name,       
        creatorId: req.userId
    })
    const region = await reg.save()
    res.status(201).json({
        message:`ma'lumotlar kiritildi`,
        data: region,
        creatorId:req.userId
    })

   
}

exports.updateRegions =async(req,res,next)=>{
    const regId = req.params.id
    const name = req.body.name
   

    try {
    const region = await Region.findById(regId)
    if(!region){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    region.name= name
   
    const data = await region.save()
   
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
    



    // Region.findById(regId)
    // .then(region=>{
    //     if(!region){
    //     const error = new Error('Object  not found')
    //     error.statusCode = 404
    //     throw error
       
    // }
    // region.name= name
    // return region.save()
    // })
    // .then(result=>{
    //     res.status(200).json({
    //         message:`ma'lumotlar o'zgartirildi`,
    //         data: result
    //     })
    // })
    // .catch(err=>{
    //     if(!err.statusCode){
    //         const error = new Error('Intenall error11111')
    //         error.statusCode = 500
    //         throw error
    //     }
    //     next(err)
    // })
}

exports.deleteRegions = async(req,res,next)=>{
    const regId= req.params.id
    try {
        const deleteddata = await Region.findById(regId)
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
    const data=await Region.findByIdAndRemove(regId)
    const districtlist = await Districts.find({regiId: regId})
    const distdeleted = await Districts.remove({_id: districtlist})    
    res.status(200).json({
        message:'Region is deletes',
        data:data,
        deleteDist : distdeleted
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
    // Region.findById(regId)
    // .then(data=>{
    //     if(!data){
    //         const error = new Error('Object  not found')
    //         error.statusCode = 404
    //         throw error
    //     }
    //     if(data.creatorId.toString()!==req.userId){
    //         const error = new Error('bu userni ochirishga imkoni yoq')
    //         error.statusCode =403
    //         throw error
    //     }
    //     return Region.findByIdAndRemove(regId)
    // })
    // .then(result=>{
    //    return User.findById(req.userId)
       
    // })
    // .then(user=>{
      
    //     user.posts.pull(regId)
    //     return user.save()
    // })
    // .then(ress=>{
    //     res.status(200).json({
    //         message:'Region is deletes'
    //     })
    // })
    // .catch(err=>{
    //     if(!err.statusCode){
    //         err.statusCode =500
    //     }
    //     next(err)
    // })
}

