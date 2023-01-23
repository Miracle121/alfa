const Agreements = require('../models/agreements')
const Agents = require('../models/agents')
const User = require('../models/users')
const  moment = require('moment')

exports.getAgreements= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Agreements.find().countDocuments()
     const data = await Agreements.find()
     .populate('branch','inn')
     .populate('groupofproductsId','name')     
     .populate('subgroupofproductsId','name')
     .populate('products','productname')
     .populate('clinets','inn')
     .populate('beneficiary','inn')
     .populate('pledgers','inn')
     .populate('objectofinsurance.typeofobjects','name')
     .populate('objectofinsurance.objects','name')
     .populate('objectofinsurance.regionId','name')
     .populate('objectofinsurance.districtsId','name')
     .populate('riskId.riskgroup','name')
     .populate('riskId.risk','name')
     .populate('riskId.classeId','name')
     .populate('paymentcurrency','name')
     .populate('franchise.risk','name')
     .populate('franchise.typeoffranchise','name')
     .populate('franchise.baseoffranchise','name')
     .populate('termination.reason','name')
     .populate('commission.agents','inn')
     .populate({
        path: 'policy',
        populate: [
            {
                path: 'branch_id',
                select: 'inn'
            },
            {
                path: 'policy_blanknumber',
                select: 'blank_number'
            }
           
           
        ]
    })



     .skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Agreements List`,
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

exports.getAgreementsById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Agreements.findById(AgesId)
        .populate('branch','inn')
        .populate('groupofproductsId','name')     
        .populate('subgroupofproductsId','name')
        .populate('products','productname')
        .populate('clinets','inn')
        .populate('beneficiary','inn')
        .populate('pledgers','inn')
        .populate('objectofinsurance.typeofobjects','name')
        .populate('objectofinsurance.objects','name')
        .populate('objectofinsurance.regionId','name')
        .populate('objectofinsurance.districtsId','name')
        .populate('riskId.riskgroup','name')
        .populate('riskId.risk','name')
        .populate('riskId.classeId','name')
        .populate('paymentcurrency','name')   
        .populate('franchise.risk','name')
        .populate('franchise.typeoffranchise','name')
        .populate('franchise.baseoffranchise','name')   
        .populate('termination.reason','name')
        .populate('commission.agents','inn')   
        .populate('policy.policyId','policynumber')
        
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Agreements List`,
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

exports.createAgreements = async(req,res,next)=>{  

    const branchs = await User.findById(req.userId).select('branch_Id')  
    const branch= branchs.branch_Id
    const agreementsnumber = req.body.agreementsnumber
    const groupofproductsId = req.body.groupofproductsId    
    const subgroupofproductsId = req.body.subgroupofproductsId    
    const products = req.body.products    
    const startofinsurance = req.body.startofinsurance    
    const endofinsurance =   moment(req.body.endofinsurance ,"DD/MM/YYYY")      
    const clinets= req.body.clinets
    const beneficiary= req.body.beneficiary
    const pledgers = req.body.pledgers
    const riskId = req.body.riskId    
    const objectofinsurance= req.body.objectofinsurance
    const totalsuminsured = req.body.totalsuminsured    
    const totalinsurancepremium = req.body.totalinsurancepremium    
    const accruedinsurancepremium = req.body.accruedinsurancepremium    
    const paidinsurancepremium = req.body.paidinsurancepremium    
    const paymentcurrency = req.body.paymentcurrency
    const duplicatefee = req.body.duplicatefee
    const demonstrablecosts = req.body.demonstrablecosts
    const premiumpaymentschedule = req.body.premiumpaymentschedule
    const franchise = req.body.franchise
    const termination = req.body.termination
    const commission = req.body.commission
    const rpm = req.body.rpm
    const appregistrationnumber = req.body.appregistrationnumber
    const applicationdate =      moment(req.body.applicationdate ,"DD/MM/YYYY")                     
    const whoaccepted = req.body.whoaccepted   
    const copyofdocuments = req.body.copyofdocuments
    const generalagreement = req.body.generalagreement
    const numberofcontract = req.body.numberofcontract
    const agreementdate =   moment( req.body.agreementdate,"DD/MM/YYYY")         
    const copyofagreement =req.body.copyofagreement
    const documents =req.body.documents
    const policy =req.body.policy   
    try {
            const result = new Agreements({    
                branch:branch,
                agreementsnumber:agreementsnumber,
                groupofproductsId:groupofproductsId,
                subgroupofproductsId:subgroupofproductsId,
                products:products,
                startofinsurance:startofinsurance,
                endofinsurance:endofinsurance,
                clinets:clinets,
                beneficiary:beneficiary,
                pledgers:pledgers,
                objectofinsurance:objectofinsurance,
                riskId:riskId,
                totalsuminsured:totalsuminsured,
                totalinsurancepremium:totalinsurancepremium,
                accruedinsurancepremium:accruedinsurancepremium,
                paidinsurancepremium:paidinsurancepremium,
                paymentcurrency:paymentcurrency,
                duplicatefee:duplicatefee,
                demonstrablecosts:demonstrablecosts,
                premiumpaymentschedule:premiumpaymentschedule,
                franchise:franchise,
                termination:termination,
                commission:commission,
                rpm:rpm,
                appregistrationnumber:appregistrationnumber,
                applicationdate:applicationdate,
                whoaccepted:whoaccepted,
                copyofdocuments:copyofdocuments,
                generalagreement:generalagreement,
                numberofcontract:numberofcontract,
                agreementdate:agreementdate,
                copyofagreement:copyofagreement,
                documents:documents,
                policy:policy,                                 
                creatorId: req.userId
            })        
            const results = await result.save()   

            res.status(200).json({
                message:`Agreements List`,
                data: results,            
                creatorId: req.userId
            })
    } catch (err) {
       
        next(err)
    }    
}

exports.updateAgreements= async(req,res,next)=>{ 
    const agreementId = req.params.id

    const branch=req.body.branch   //    branchs.branch_Id
    const agreementsnumber = req.body.agreementsnumber
    const groupofproductsId = req.body.groupofproductsId    
    const subgroupofproductsId = req.body.subgroupofproductsId    
    const products = req.body.products    
    const startofinsurance = req.body.startofinsurance    
    const endofinsurance = req.body.endofinsurance    
    const riskId = req.body.riskId    
    const totalsuminsured = req.body.totalsuminsured    
    const totalinsurancepremium = req.body.totalinsurancepremium    
    const accruedinsurancepremium = req.body.accruedinsurancepremium    
    const paidinsurancepremium = req.body.paidinsurancepremium    
    const paymentcurrency = req.body.paymentcurrency
    const duplicatefee = req.body.duplicatefee
    const demonstrablecosts = req.body.demonstrablecosts
    const premiumpaymentschedule = req.body.premiumpaymentschedule
    const franchise = req.body.franchise
    const termination = req.body.termination
    const commission = req.body.commission
    const rpm = req.body.rpm
    const appregistrationnumber = req.body.appregistrationnumber
    const applicationdate = req.body.applicationdate 
    const whoaccepted = req.body.whoaccepted   
    const copyofdocuments = req.body.copyofdocuments
    const generalagreement = req.body.generalagreement
    const numberofcontract = req.body.numberofcontract
    const agreementdate =moment(req.body.agreementdate,"DD/MM/YYYY") 
    const copyofagreement =req.body.copyofagreement
    const documents =req.body.documents
    const policy =req.body.policy 

    // const expirationdate = moment(req.body.expirationdate,"DD/MM/YYYY")
    try {
    const result = await Agreements.findById(agreementId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }   
    result.branch=branch
    result.agreementsnumber=agreementsnumber
    result.groupofproductsId=groupofproductsId
    result.subgroupofproductsId=subgroupofproductsId
    result.products=products
    result.startofinsurance=startofinsurance
    result.endofinsurance=endofinsurance
    result.riskId=riskId
    result.totalsuminsured=totalsuminsured
    result.totalinsurancepremium=totalinsurancepremium
    result.accruedinsurancepremium=accruedinsurancepremium
    result.paidinsurancepremium=paidinsurancepremium
    result.paymentcurrency=paymentcurrency
    result.duplicatefee=duplicatefee
    result.demonstrablecosts=demonstrablecosts
    result.premiumpaymentschedule=premiumpaymentschedule
    result.franchise=franchise
    result.termination=termination
    result.commission=commission
    result.rpm=rpm
    result.appregistrationnumber=appregistrationnumber
    result.applicationdate=applicationdate
    result.whoaccepted=whoaccepted
    result.copyofdocuments=copyofdocuments
    result.generalagreement=generalagreement
    result.numberofcontract=numberofcontract
    result.agreementdate=agreementdate
    result.copyofagreement=copyofagreement
    result.documents=documents
    result.policy=policy 
    const data =await result.save()  
    res.status(200).json({
        message:`Agreements List`,
        data: data
    })
    } 
    catch (err) {
       
        next(err)
    }
}

exports.deleteAgreements = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Agreements.findById(AgesId)
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
    const data=await Agreements.findByIdAndRemove(AgesId)
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

exports.findebyquery =async(req,res,next)=>{ 
    let agentsdata
    let agentscount
    const inn = req.get('inn')
    const nameoforganization = req.get('nameoforganization')
    const name = req.get('name')
    const secondname = req.get('secondname')
    const middlename = req.get('middlename')
    const passportSeries = req.get('passportSeries')
    const passportNumber = req.get('passportNumber')
    const pin= req.get('pin')

    que = {}
    
    if (inn)
        que.inn = inn
    if (nameoforganization)
        que['corporateentitiesdata.nameoforganization'] = nameoforganization
    if (name)
        que['forindividualsdata.name'] = name
    if (secondname)
        que['forindividualsdata.secondname'] = secondname
    if (middlename)
        que['forindividualsdata.middlename'] = middlename
    if (passportSeries)
        que['forindividualsdata.passportSeries'] = passportSeries
    if (passportNumber)
        que['forindividualsdata.passportNumber'] = passportNumber
    if (pin)
        que['forindividualsdata.pin'] = pin   
        // console.log(que);
    try {

        agentscount = await Agents.find(que).countDocuments()
         agentsdata = await Agents.find(que)
         .populate('branch','branchname')        
         .populate('typeofpersons','name')     
         .populate('typeofagent','name')
         .populate('accountstatus','name')
         .populate('accountrole','name')  
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
        
         res.status(200).json({
            message: `Agents list`,
            data: agentsdata,
            agentscount: agentscount
        })

    } catch (error) {
        next(error)        
    }
}