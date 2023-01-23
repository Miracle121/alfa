const Policy = require('../models/policy')
const User = require('../models/users')
const Agreements = require('../models/agreements')
const Policyblank = require('../models/bco/policyblank')

const  moment = require('moment')

exports.getPolicy= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Policy.find().countDocuments()
     const data = await Policy.find()
     .populate('branch_id','inn') 
     .populate('agreementsId','agreementsnumber')    
     .populate('policy_blanknumber','blank_number')    
     .populate('typeofpoliceId','name')
     .populate('statusofpolicy','name')
     .populate('statusofpayment','name')
     .populate('objectofinsurance.typeofobjects','name')
     .populate('objectofinsurance.objects','name')
     .populate('objectofinsurance.regionId','name')
     .populate('objectofinsurance.districtsId','name')
     .populate('riskId.riskgroup','name')
     .populate('riskId.risk','name')
     .populate('riskId.classeId','name')
     .populate('statusofpolicy','name')
     .populate('statusofpayment','name')

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
        .populate('branch_id','inn') 
        .populate('agreementsId','agreementsnumber')
        .populate('policy_blanknumber','blank_number')     
        .populate('typeofpoliceId','name')
        .populate('statusofpolicy','name')
        .populate('statusofpayment','name')
        .populate('objectofinsurance.typeofobjects','name')
        .populate('objectofinsurance.objects','name')
        .populate('objectofinsurance.regionId','name')
        .populate('objectofinsurance.districtsId','name')   
        .populate('riskId.riskgroup','name')
        .populate('riskId.risk','name')
        .populate('riskId.classeId','name')
        .populate('statusofpolicy','name')
        .populate('statusofpayment','name')     
       

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
    const policy_blanknumber = req.body.policy_blanknumber
    const policy_number = req.body.policy_number
    const typeofpoliceId = req.body.typeofpoliceId    
    const dateofissue = moment(req.body.dateofissue,"DD/MM/YYYY")
    const dateofend = moment(req.body.dateofend,"DD/MM/YYYY") 
   
    const unixdateofissue = new Date(dateofissue)
    const dateofissueunix = Math.floor(unixdateofissue.getTime()/1000);
    const unixdateofendunix = new Date(dateofend)
    const dateofendunix = Math.floor(unixdateofendunix.getTime()/1000)     
    
    const copyofdocuments = req.body.copyofdocuments   
    const riskId = req.body.riskId
    const objectofinsurance = req.body.objectofinsurance
    const statusofpolicy = req.body.statusofpolicy
    const statusofpayment = req.body.statusofpayment
    const resultagreements = await Agreements.findById(agreementsId)
    const policyblanknumber = await Policyblank.findById(policy_blanknumber)
    
    
   
    const branch_id =resultagreements.branch

    try {              
            const result = new Policy({    
                branch_id:branch_id,
                agreementsId:agreementsId,
                policy_blanknumber:policy_blanknumber,
                policy_number:policy_number,
                typeofpoliceId:typeofpoliceId,                
                dateofissue:dateofissue,
                dateofend:dateofend,
                dateofissueunix:dateofissueunix,
                dateofendunix:dateofendunix,
                copyofdocuments:copyofdocuments,   
                riskId:riskId,
                objectofinsurance:objectofinsurance,
                statusofpolicy:statusofpolicy,
                statusofpayment:statusofpayment,
                creatorId: req.userId
            })
            const results = await result.save() 

            resultagreements.policy= results._id
            const data =await resultagreements.save()   
            policyblanknumber.policy_number=policy_number
            policyblanknumber.policy_id = results._id
            policyblanknumber.Is_usedblank = true
            policyblanknumber.branch_id =branch_id

            const datablanknumber = await policyblanknumber.save()
            // console.log(datablanknumber);
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
    const typeofpoliceId = req.body.typeofpoliceId    
    const dateofissue = moment(req.body.dateofissue,"DD/MM/YYYY")
    const dateofend = moment(req.body.dateofend,"DD/MM/YYYY") 
    const dateofissueunix = Math.floor((dateofissue).getTime()/1000);
    const dateofendunix = Math.floor((dateofend).getTime()/1000)
    const copyofdocuments = req.body.copyofdocuments   
    const riskId = req.body.riskId
    const objectofinsurance = req.body.objectofinsurance
    const statusofpolicy = req.body.statusofpolicy
    const statusofpayment = req.body.statusofpayment
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
    result.typeofpoliceId=typeofpoliceId
    result.dateofissue=dateofissue    
    result.dateofend=dateofend
    result.dateofissueunix=dateofissueunix
    result.dateofendunix=dateofendunix
    result.copyofdocuments=copyofdocuments
    result.riskId=riskId
    result.objectofinsurance=objectofinsurance
    result.statusofpolicy=statusofpolicy
    result.statusofpayment=statusofpayment 
    
    const data =await result.save()  
    res.status(200).json({
        message:`Policy List`,
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



exports.getPolicyByAgeementId = async(req,res,next)=>{
    
    const AgesId= req.params.id
    try {
        const result= await Policy.find({'agreementsId':AgesId})
        .populate('agreementsId','agreementsnumber')     
        .populate('typeofpoliceId','name')
        .populate('statusofpolicy','name')
        .populate('statusofpayment','name')
        .populate('objectofinsurance.typeofobjects','name')
        .populate('objectofinsurance.objects','name')
        .populate('objectofinsurance.regionId','name')
        .populate('objectofinsurance.districtsId','name')   
        .populate('riskId.riskgroup','name')
        .populate('riskId.risk','name')
        .populate('riskId.classeId','name')
        .populate('statusofpolicy','name')
        .populate('statusofpayment','name')      

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
