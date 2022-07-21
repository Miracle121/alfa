const Breanches = require('../models/breanches')
const User = require('../models/users')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

exports.getBreanches= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Breanches.find().countDocuments()
     const data = await Breanches.find()    
     .populate('regionId','name')
     
     .populate('breanchstatus','name')
     .populate({
        path: 'employees',
        populate:[
            {
                path: 'positions',
                select: 'name'
            }
        ]
     })
   
      
     .skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Breanches List`,
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

exports.getBreanchesById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Breanches.findById(AgesId)
        .populate('regionId','name')     
        .populate('breanchstatus','name')
        .populate({
           path: 'employees',
           populate:[
               {
                   path: 'positions',
                   select: 'name'
               }
           ]
        }) 
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Breanches List`,
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

exports.createBreanches = async(req,res,next)=>{     
    const levelofbreanches = req.body.levelofbreanches
    const codeofbreanches = req.body.codeofbreanches
    const inn = req.body.inn
    const regionId = req.body.regionId
    const branchname= req.body.branchname    
    const shorttitleofbranch= req.body.shorttitleofbranch
    const address = req.body.address 
    const telephone = req.body.telephone   
    let email =req.body.email
    let agreementnumber =req.body.agreementnumber
    const agreementdate = req.body.agreementdate
    const expirationdate = req.body.expirationdate
    const employees = req.body.employees
    const checkingaccount = req.body.checkingaccount
    const mfo = req.body.mfo
    const nameofbank = req.body.nameofbank
    const breanchstatus = req.body.breanchstatus   
    try {

        const inndata = await Breanches.find({"inn":inn})

        if(inndata){
            res.status(200).json({
                message:`Breanches List`,
                data: inndata,            
                creatorId: req.userId,
            })
        }else{

            const result = new Breanches({       
                levelofbreanches:levelofbreanches,
                codeofbreanches:codeofbreanches,
                inn:inn,
                regionId:regionId,
                branchname:branchname,
                shorttitleofbranch:shorttitleofbranch,
                address:address,
                telephone:telephone,
                email:email,
                agreementnumber:agreementnumber,
                agreementdate:agreementdate,
                expirationdate:expirationdate,
                employees:employees,
                checkingaccount:checkingaccount,
                mfo:mfo,
                nameofbank:nameofbank,
                breanchstatus:breanchstatus,          
                creatorId: req.userId
            })
            // console.log(result);
            const results = await result.save()      
            res.status(200).json({
                message:`Breanches List`,
                data: results,            
                creatorId: req.userId,
            })
        }
        
        

      
    } catch (err) {
        if(!err.statusCode){
            const err = new Error('Agentni qoshishda xatolik')
            err.statusCode = 500
            throw err
        }
        next(err)
    }    
}

exports.updateBreanches= async(req,res,next)=>{ 
    const AgesId = req.params.id
    const inn = req.body.inn
    const typeofpersons= req.body.typeofpersons
    const regionId= req.body.regionId
    const isbeneficiary= req.body.isbeneficiary
    const isfixedpolicyholde = req.body.isfixedpolicyholde 
    const typeofagent = req.body.typeofagent   
    const address = req.body.address
    let forindividualsdata =req.body.forindividualsdata
    let corporateentitiesdata =req.body.corporateentitiesdata
    const telephonenumber = req.body.telephonenumber
    const isUsedourpanel = req.body.isUsedourpanel
    const isUserRestAPI = req.body.isUserRestAPI
    //=============================
    const email = req.body.email
    const password = req.body.password
    const accountstatus = req.body.accountstatus
    const accountrole = req.body.accountrole
    const hashpass = await  bcrypt.hash(password,12)   
    try {
    const result = await Breanches.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }   
    result.inn=inn
    result.typeofpersons=typeofpersons
    result.regionId=regionId
    result.isbeneficiary=isbeneficiary
    result.isfixedpolicyholde=isfixedpolicyholde
    result.typeofagent=typeofagent
    result.forindividualsdata=forindividualsdata
    result.corporateentitiesdata=corporateentitiesdata
    result.address=address
    result.forindividualsdata=forindividualsdata
    result.corporateentitiesdata=corporateentitiesdata
    result.telephonenumber=telephonenumber
    result.isUsedourpanel=isUsedourpanel
    result.isUserRestAPI=isUserRestAPI
    result.email=email
    result.password=hashpass
    result.accountstatus=accountstatus
    result.accountrole=accountrole
    const data =await result.save()  
    res.status(200).json({
        message:`Agents List`,
        data: data
    })
    } 
    catch (err) {
        if(!err.statusCode){
            const error = new Error('Intenall error11111')
            error.statusCode = 500
            throw error
        }
        next(err)
    }
}

exports.deleteBreanches = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Breanches.findById(AgesId)
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
    const data=await Breanches.findByIdAndRemove(AgesId)
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