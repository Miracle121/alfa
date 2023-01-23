const Agents = require('../models/agents')
const User = require('../models/users')
const  moment = require('moment')

exports.getAgents= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Agents.find().countDocuments()
     const data = await Agents.find()
       .populate('branch','branchname')        
        .populate('typeofpersons','name')     
        .populate('typeofagent','name')
      
        .populate({
            path: 'forindividualsdata',
            populate:[
                {               
                    path: 'gender',
                    select: 'name'
                },
                {               
                    path: 'citizenship',
                    select: 'name'
                },
                {               
                    path: 'typeofdocument',
                    select: 'name'
                },
                {               
                    path: 'regions',
                    select: 'name'
                },
                {               
                    path: 'districts',
                    select: 'name'
                },

                
            ]
        })
        .populate({
            path: 'corporateentitiesdata',
            populate:[
                {               
                    path: 'regionId',
                    select: 'name'
                },
                {               
                    path: 'districts',
                    select: 'name'
                },
                {
                    path: 'employees',
                    populate:[
                        {
                            path: 'positions',
                            select: 'name'
                        },
                        {
                            path: 'typeofdocumentsformanager',
                            select: 'name'
                        },
                    ]
                }
            ]
        })  
     .skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Agents List`,
         data:data,
         totalItems:totalItems
     })
    } catch (err) {
      
        next(err)
    } 
}

exports.getAgentsById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Agents.findById(AgesId)
        .populate('branch','branchname')        
        .populate('typeofpersons','name')     
        .populate('typeofagent','name')
        .populate({
            path: 'forindividualsdata',
            populate:[
                {               
                    path: 'gender',
                    select: 'name'
                },
            ]
        })
        .populate({
            path: 'corporateentitiesdata',
            populate:[
                {               
                    path: 'regionId',
                    select: 'name'
                },
                {               
                    path: 'districts',
                    select: 'name'
                },
                {
                    path: 'employees',
                    populate:[
                        {
                            path: 'positions',
                            select: 'name'
                        },
                        {
                            path: 'typeofdocumentsformanager',
                            select: 'name'
                        },
                    ]
                }
            ]
        })
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Agents List`,
            data:result
        })
    } 
    catch (err) {
       
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
    try {
       const inn1= await Agents.find({"inn":inn})    
       if(inn1.length===0){     
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
       
            creatorId: req.userId
        })
        const results = await result.save()            
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
        next(err)
    }    
}

exports.updateAgents = async(req,res,next)=>{ 
    const AgesId = req.params.id
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
   
    try {
    const result = await Agents.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }   
    result.inn=inn
    result.branch=branch
    result.agreementnumber=agreementnumber
    result.agreementdate=agreementdate
    result.typeofpersons=typeofpersons
    result.isbeneficiary=isbeneficiary
    result.isfixedpolicyholde=isfixedpolicyholde
    result.typeofagent=typeofagent
    result.forindividualsdata=forindividualsdata
    result.corporateentitiesdata=corporateentitiesdata
    result.isUsedourpanel=isUsedourpanel
    result.isUserRestAPI=isUserRestAPI
  
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