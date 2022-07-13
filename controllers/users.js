const Districts = require('../models/districts')
const Region = require('../models/regions')
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')

exports.getUsers= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
    totalItems = await User.find().countDocuments()
     const users = await User.find()    
     .populate('accountstatus','name')
     .populate('accountrole','name')
    //  .populate({
    //     path: 'orders',
    //     populate: [
    //         {
    //             path: 'regiId',
    //             select:'name'
               
    //         },
    //         {
    //             path: 'districtId',
    //             select:'name'
               
    //         },
    //         {
    //             path: 'mfyId',
    //             select:'name'
               
    //         },
    //         {
    //             path: 'orderstatus',
    //             select:'name'
               
    //         },
    //         {
    //             path: 'basisorder',
    //             select:'name'
    //         },
    //         {
    //             path: 'basistermination',
    //             select:'name'
    //         },
    //         {
    //             path: 'orederresults',
    //             select:'name'
    //         }

    //     ]

       
        
    //     })
     .skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`User haqida ma'/lumot`,
         data:users,
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

exports.getUsersById= async(req,res,next)=>{
    const userId= req.params.id
    try {
        const users= await User.findById(userId) .populate('regionId','name')        
        .populate('accountstatus','name')
        .populate('accountrole','name')     
        if(!users){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`ma'lumotlar topildi`,
            users:users
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }

}

exports.CreateUsers= async(req,res,next)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const error = new Error('Validation error')
            error.statusCode = 422
            error.data = errors.array()
            throw error
        }
        const fullname = req.body.fullname    
        const email = req.body.email  
        const password= req.body.password
        const accountstatus = req.body.accountstatus
        const accountrole = req.body.accountrole
       
        const hashpass = await  bcrypt.hash(password,12)
        const user = new User({
            email:email,
            password:hashpass,
            fullname:fullname,       
            accountstatus:accountstatus,
            accountrole:accountrole,          
         
            creatorId :req.userId
        })
        const users = await user.save()
        res.status(201).json({
            message:'User bazaga kiritildi',
            users:users
        })
    } catch (err) {
        if(!err.statusCode){
            const error = new Error('Intenall error')
            error.statusCode = 500
            throw error
        }
        next(err)
    }
}

exports.UpdateUsers =async(req,res,next)=>{
    const userId = req.params.id
    const fullname = req.body.fullname    
    const email = req.body.email  
    const password= req.body.password
    const accountstatus = req.body.accountstatus
    const accountrole = req.body.accountrole
    try {
    const user = await User.findById(userId)
    if(!user){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    const hashpass = await  bcrypt.hash(password,12)
    user.fullname = fullname
    user.email=email 
    user.password = hashpass
    user.accountstatus = accountstatus
    user.accountrole = accountrole
    const data =await user.save()
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

exports.DeleteUsers = async(req,res,next)=>{
    const usersId= req.params.id
    try {
        const deleteddata = await User.findById(usersId)
       
    if(!deleteddata){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    // if(deleteddata.creatorId.toString()!==req.userId){
    //     const error = new Error('bu userni ochirishga imkoni yoq')
    //     error.statusCode =403
    //     throw error
    // }
    const data=await User.findByIdAndRemove(usersId)
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

exports.UserFilter = async(req,res,next)=>{  
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    const regId =req.get('regId') || null
    const districtsId =req.get('distId') ||null
    const mfyId = req.get('mfyId')|| null  
    const accountstatus = req.get('mfyId')|| null 
    const accountrole = req.get('mfyId')|| null 
    const zvaniya = req.get('mfyId')|| null  
  
    let oredercount
  try {

    let query = {}

    if(regId)
        query.regionId= regId;
    if(districtsId)
        query.districtsId = districtsId
    if(mfyId)
        query.mfyId=mfyId
    if(accountstatus)
        query.accountstatus=accountstatus
    if(accountrole)
        query.accountrole=accountrole
    if(zvaniya)
        query.zvaniya=zvaniya
        totalItems = await User.find(query).countDocuments()
   

    oredercount = await User.find(query)
            .populate('regionId','name')
            .populate('districtsId','name')
            .populate('mfyId','name')
            .populate('accountstatus','name')
            .populate('accountrole','name')
            .skip((page-1)*counts).limit(counts)

    res.status(200).json({
        message:`Ҳимоя ордерларини рўйхатга олиш`,
        users:oredercount,
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

exports.Usersearch = async(req,res,next)=>{
    const search = req.query.search || null
    const page = req.query.page ||1 
    const counts = 20
    let bigQuery = {}
    let or_list = []
    if (search) {
            or_list.push({
                'name': {"$regex": search, "$options": "i"}
                  })
            or_list.push({
                    'secondname': {"$regex": search, "$options": "i"}
                })
            or_list.push({
                    'middlename': {"$regex": search, "$options": "i"}
                })
            or_list.push({
                    'email': {"$regex": search, "$options": "i"}
                })
            }
    if (search)
        bigQuery = {
             $or: or_list
        }
        const users = await User.find(bigQuery)
     .populate('regionId','name')
     .populate('districtsId','name')
     .populate('mfyId','name')
     .populate('accountstatus','name')
     .populate('accountrole','name')
     .populate({
        path: 'orders',
        populate: [
            {
                path: 'regiId',
                select:'name'
               
            },
            {
                path: 'districtId',
                select:'name'
               
            },
            {
                path: 'mfyId',
                select:'name'
               
            },
            {
                path: 'orderstatus',
                select:'name'
               
            },
            {
                path: 'basisorder',
                select:'name'
            },
            {
                path: 'basistermination',
                select:'name'
            },
            {
                path: 'orederresults',
                select:'name'
            }
        ]})
     .skip((page-1)*counts).limit(counts)
      const totalItems = await User.find(bigQuery).countDocuments() 
        res.status(200).json({
            message:`Xodimlar ro'yxati`,
            users:users,
            totalItems:totalItems
        })  


}