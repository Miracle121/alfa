const Agents = require('../models/agents')
const User = require('../models/users')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const  moment = require('moment')
exports.getAgents= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Agents.find().countDocuments()
     const data = await Agents.find()
     .populate('typeofpersons','name')
    //  .populate('regionId','name')
     .populate('typeofagent','name')
     .populate('accountstatus','name')
     .populate('accountrole','name')     
     .skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Agents List`,
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

exports.getAgentsById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Agents.findById(AgesId)
        .populate('typeofpersons','name')
        .populate('regionId','name')
        .populate('typeofagent','name')
        .populate('accountstatus','name')
        .populate('accountrole','name')  
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Agents List`,
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

exports.createAgents = async(req,res,next)=>{     
    const inn = req.body.inn
    const branch = req.body.branch
    const agreementnumber = req.body.agreementnumber || null
    const agreementdate = req.body.agreementdate || null //moment(req.body.agreementdate,"DD/MM/YYYY")       
    const typeofpersons= req.body.typeofpersons    
    const isbeneficiary= req.body.isbeneficiary||null
    const isfixedpolicyholde = req.body.isfixedpolicyholde || null
    const typeofagent = req.body.typeofagent       
    let forindividualsdata =req.body.forindividualsdata || null
    let corporateentitiesdata =req.body.corporateentitiesdata || null
    const isUsedourpanel = req.body.isUsedourpanel
    const isUserRestAPI = req.body.isUserRestAPI
    const email = req.body.email
    const password = req.body.password
    const accountstatus = req.body.accountstatus
    const accountrole = req.body.accountrole
    const hashpass = await  bcrypt.hash(password,12) 
   
    try {
       const inn1= await Agents.find({"inn":inn})
       const email1= await User.find({"email":email})       
       if(inn1.length===0 && email1.length===0){     
        const result = new Agents({       
            inn:inn,
            branch:branch,
            agreementnumber:agreementnumber,
            agreementdate:agreementdate,
            typeofpersons:typeofpersons,                       
            isbeneficiary:isbeneficiary,
            isfixedpolicyholde:isfixedpolicyholde,
            typeofagent:typeofagent,
            forindividualsdata:forindividualsdata,
            corporateentitiesdata:corporateentitiesdata,         
            isUsedourpanel:isUsedourpanel,
            isUserRestAPI:isUserRestAPI,
            email:email,
            password:hashpass,
            accountstatus:accountstatus,
            accountrole:accountrole,
            creatorId: req.userId
        })
        const results = await result.save()       
        const resultUsers=  new User({
                email:email,
                password:hashpass,
                accountstatus:accountstatus,
                accountrole:accountrole,
                agentId:results._id,
                creatorId: req.userId
            })
        const userdata = await resultUsers.save()   
        console.log(userdata);
        res.status(200).json({
            message:`Agents List`,
            data: results,            
            creatorId: req.userId,
        })
       }else{
        res.status(200).json({
            message:`Agents List`,
            data: inn1,
            creatorId: req.userId,
        })
       }     
    } catch (err) {

        // console.log(err);
        // if(!err.statusCode){
        //     const err = new Error(err)
        //     err.statusCode = 500
        //     throw err
        // }
        next(err)
    }    
}

exports.updateAgents = async(req,res,next)=>{ 
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
    const result = await Agents.findById(AgesId)
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

exports.deleteAgents = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Agents.findById(AgesId)
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
    const data=await Agents.findByIdAndRemove(AgesId)
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