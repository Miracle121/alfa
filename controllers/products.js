const Products = require('../models/products')
const Agents = require('../models/agents')
const {validationResult} = require('express-validator')
let xx=[]
exports.getProducts= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Products.find().countDocuments()
        const data = await Products.find()
        .populate('groupofproductsId','name')
        .populate('subgroupofproductsId','name')
        .populate('typeofsectorId','name')
        .populate('typeofinsurerId','name')
        .populate('statusofproducts','name')      
        .populate('riskId.riskgroup','name')
        .populate('riskId.risk','name')
        .populate('riskId.classeId','name')
        .populate('applicationformId','name')
        .populate('additionaldocuments','name')
        .populate('fixedpolicyholder','name')
        .populate('fixedbeneficiary','name')
        .populate('policyformatId','name')
        .populate('typeofclaimsettlement','name')
        .populate('typeofrefund','name')
        .populate('typeofrefund','name')
        .populate('typeofpayment','name')
        .populate('typeofpolice','name')
        // .populate('tariff.agentlist','name')
        // .populate('tariffperclasses.classes','name')
        .populate('franchise.risk','name')
        .populate('franchise.typeoffranchise','name')
        .populate('franchise.baseoffranchise','name')    
        .populate({
            path: 'tariff',
            populate:[                
                {               
                    path: 'agentlist',
                    select: 'inn'
                },
                {
                    path: 'tariffperclasses',
                    populate:[
                        {
                            path: 'classes',
                            select: 'name'
                        },
                    ]
                }
           

            ]           
         })

        .skip((page-1)*counts).limit(counts)
         res.status(200).json({
         message:`Products list`,
         data:data,
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

exports.getProductsId =async(req,res,next)=>{
    const riskId= req.params.id
    try {
        const data= await Products.findById(riskId)
        .populate('groupofproductsId','name')
        .populate('subgroupofproductsId','name')
        .populate('typeofsectorId','name')
        .populate('typeofinsurerId','name')
        .populate('statusofproducts','name')      
        .populate('riskId.riskgroup','name')
        .populate('riskId.risk','name')
        .populate('riskId.classeId','name')
        .populate('applicationformId','name')
        .populate('additionaldocuments','name')
        .populate('fixedpolicyholder','fullName')
        .populate('fixedbeneficiary','fullName')
        .populate('policyformatId','name')
        .populate('typeofclaimsettlement','name')
        .populate('typeofrefund','name')
        .populate('typeofrefund','name')
        .populate('typeofpayment','name')
        .populate('typeofpolice','name')
        // .populate('agentlist','fullName')
        // .populate('tariffperclasses.classes','name')
        .populate('franchise.risk','name')
        .populate('franchise.typeoffranchise','name')
        .populate('franchise.baseoffranchise','name')
        .populate({
            path: 'tariff',
            populate:[                
                {               
                    path: 'agentlist',
                    select: 'inn'
                },
                {
                    path: 'tariffperclasses',
                    populate:[
                        {
                            path: 'classes',
                            select: 'name'
                        },
                    ]
                }
           

            ]           
         })

        if(!data){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Products list`,
            data:data
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createProducts= async (req,res,next)=>{  
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const productname = req.body.productname
    const codeproduct= req.body.codeproduct
    const versionproduct= req.body.versionproduct
    const groupofproductsId = req.body.groupofproductsId
    const subgroupofproductsId= req.body.subgroupofproductsId
    const typeofsectorId= req.body.typeofsectorId
    const isrequirepermission= req.body.isrequirepermission
    const typeofpersones = req.body.typeofpersones
    const typeofinsurerId= req.body.typeofinsurerId
    const statusofproducts = req.body.statusofproducts
    const riskId = req.body.riskId
    const isapplicationform = req.body.isapplicationform
    const applicationformId = req.body.applicationformId
    const iscontractform= req.body.iscontractform
    const contractform= req.body.contractform
    const Isadditionaldocuments= req.body.Isadditionaldocuments
    const additionaldocuments= req.body.additionaldocuments      
    //===========page 3===================
    const Isfixedpolicyholder = req.body.Isfixedpolicyholder
    const fixedpolicyholder = req.body.fixedpolicyholder
    const Isbeneficiary = req.body.Isbeneficiary
    const Isfixedbeneficiary= req.body.Isfixedbeneficiary
    const fixedbeneficiary = req.body.fixedbeneficiary
    const Isfixedpremium= req.body.Isfixedpremium
    const fixedpremium = req.body.fixedpremium
    const Isbettingrange = req.body.Isbettingrange
    const Isfixedrate = req.body.Isfixedrate
    const fixedrate = req.body.fixedrate
    const Isfixedsuminsured= req.body.Isfixedsuminsured
    const fixedsuminsured= req.body.fixedsuminsured
    const Isfixedfee= req.body.Isfixedfee
    const fixedfee= req.body.fixedfee
    const Isfixedpreventivemeasures= req.body.Isfixedpreventivemeasures
    const fixedpreventivemeasures = req.body.fixedpreventivemeasures
    const Ispolicywithoutpayment= req.body.Ispolicywithoutpayment
    const Ismultipleagents= req.body.Ismultipleagents
    const Isfranchisechange= req.body.Isfranchisechange
    const Isforeigncurrency= req.body.Isforeigncurrency
    const policyformatId= req.body.policyformatId
    const typeofclaimsettlement= req.body.typeofclaimsettlement
    const typeofrefund= req.body.typeofrefund
    const typeofpayment= req.body.typeofpayment
    const typeofpolice= req.body.typeofpolice
    const minimumterminsurance= req.body.minimumterminsurance
    const maxterminsurance= req.body.maxterminsurance

    const tariff = req.body.tariff
  

    // const agentlist= req.body.agentlist
    // const Isagreement= req.body.Isagreement
    // const limitofagreement= req.body.limitofagreement
    // const tariffperclasses= req.body.tariffperclasses


    const franchise= req.body.franchise  
    const group =new Products({
        productname: productname,
        codeproduct:codeproduct,
        versionproduct:versionproduct,
        groupofproductsId:groupofproductsId,
        subgroupofproductsId:subgroupofproductsId,
        typeofsectorId:typeofsectorId,
        typeofpersones:typeofpersones,
        isrequirepermission:isrequirepermission,
        typeofinsurerId:typeofinsurerId,
        statusofproducts:statusofproducts,
        riskId:riskId,
        isapplicationform:isapplicationform,
        applicationformId:applicationformId,
        iscontractform:iscontractform,
        contractform:contractform,
        Isadditionaldocuments:Isadditionaldocuments,
        additionaldocuments:additionaldocuments,
        Isfixedpolicyholder:Isfixedpolicyholder,
        fixedpolicyholder:fixedpolicyholder,
        Isbeneficiary:Isbeneficiary,
        Isfixedbeneficiary:Isfixedbeneficiary,
        fixedbeneficiary:fixedbeneficiary,
        Isfixedpremium:Isfixedpremium,
        fixedpremium:fixedpremium,
        Isbettingrange:Isbettingrange,
        Isfixedrate:Isfixedrate,
        fixedrate:fixedrate,
        Isfixedsuminsured:Isfixedsuminsured,
        fixedsuminsured:fixedsuminsured,
        Isfixedfee:Isfixedfee,
        fixedfee:fixedfee,
        Isfixedpreventivemeasures:Isfixedpreventivemeasures,
        fixedpreventivemeasures:fixedpreventivemeasures,
        Ispolicywithoutpayment:Ispolicywithoutpayment,
        Ismultipleagents:Ismultipleagents,
        Isfranchisechange:Isfranchisechange,
        Isforeigncurrency:Isforeigncurrency,
        policyformatId:policyformatId,
        typeofclaimsettlement:typeofclaimsettlement,
        typeofrefund:typeofrefund,
        typeofpayment:typeofpayment,
        typeofpolice:typeofpolice,
        minimumterminsurance:minimumterminsurance,
        maxterminsurance:maxterminsurance,
        tariff:tariff,

        // agentlist:agentlist,
        // Isagreement:Isagreement,
        // limitofagreement:limitofagreement,
        // tariffperclasses:tariffperclasses,

        franchise:franchise,
        creatorId: req.userId
    })
    // console.log(group._id);
    const groups = await group.save()

    res.status(201).json({
        message:`Products added`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateProducts =async(req,res,next)=>{
    const productId= req.params.id
    const productname = req.body.productname
    const codeproduct= req.body.codeproduct
    const versionproduct= req.body.versionproduct
    const groupofproductsId = req.body.groupofproductsId
    const subgroupofproductsId= req.body.subgroupofproductsId
    const typeofsectorId= req.body.typeofsectorId
    const typeofpersones = req.body.typeofpersones
    const isrequirepermission= req.body.isrequirepermission
    const typeofinsurerId= req.body.typeofinsurerId
    const statusofproducts = req.body.statusofproducts
    const riskId = req.body.riskId
    const isapplicationform = req.body.isapplicationform
    const applicationformId = req.body.applicationformId
    const iscontractform= req.body.iscontractform
    const contractform= req.body.contractform
    const Isadditionaldocuments= req.body.Isadditionaldocuments
    const additionaldocuments= req.body.additionaldocuments
    //===========page 3===================
    const Isfixedpolicyholder = req.body.Isfixedpolicyholder
    const fixedpolicyholder = req.body.fixedpolicyholder
    const Isbeneficiary = req.body.Isbeneficiary
    const Isfixedbeneficiary= req.body.Isfixedbeneficiary
    const fixedbeneficiary = req.body.fixedbeneficiary
    const Isfixedpremium= req.body.Isfixedpremium
    const fixedpremium = req.body.fixedpremium
    const Isbettingrange = req.body.Isbettingrange
    const Isfixedrate = req.body.Isfixedrate
    const fixedrate = req.body.fixedrate
    const Isfixedsuminsured= req.body.Isfixedsuminsured
    const fixedsuminsured= req.body.fixedsuminsured
    const Isfixedfee= req.body.Isfixedfee
    const fixedfee= req.body.fixedfee
    const Isfixedpreventivemeasures= req.body.Isfixedpreventivemeasures
    const fixedpreventivemeasures = req.body.fixedpreventivemeasures
    const Ispolicywithoutpayment= req.body.Ispolicywithoutpayment
    const Ismultipleagents= req.body.Ismultipleagents
    const Isfranchisechange= req.body.Isfranchisechange
    const Isforeigncurrency= req.body.Isforeigncurrency
    const policyformatId= req.body.policyformatId
    const typeofclaimsettlement= req.body.typeofclaimsettlement
    const typeofrefund= req.body.typeofrefund
    const typeofpayment= req.body.typeofpayment
    const typeofpolice= req.body.typeofpolice
    const minimumterminsurance= req.body.minimumterminsurance
    const maxterminsurance= req.body.maxterminsurance

    const tariff = req.body.tariff

    // const agentlist= req.body.agentlist
    // const Isagreement= req.body.Isagreement
    // const limitofagreement= req.body.limitofagreement
    // const tariffperclasses= req.body.tariffperclasses
    const franchise= req.body.franchise     
    try {
    const products = await Products.findById(productId)
    if(!products){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    products.productname= productname  
    products.codeproduct=codeproduct
    products.versionproduct=versionproduct
    products.groupofproductsId=groupofproductsId
    products.subgroupofproductsId=subgroupofproductsId
    products.typeofsectorId=typeofsectorId
    products.typeofpersones =typeofpersones
    products.isrequirepermission=isrequirepermission
    products.typeofinsurerId=typeofinsurerId
    products.statusofproducts=statusofproducts
    products.riskId=riskId
    products.isapplicationform=isapplicationform
    products.applicationformId=applicationformId
    products.iscontractform=iscontractform
    products.contractform=contractform
    products.Isadditionaldocuments=Isadditionaldocuments
    products.additionaldocuments=additionaldocuments
    products.Isfixedpolicyholder=Isfixedpolicyholder
    products.fixedpolicyholder=fixedpolicyholder
    products.Isbeneficiary=Isbeneficiary
    products.Isfixedbeneficiary=Isfixedbeneficiary
    products.fixedbeneficiary=fixedbeneficiary
    products.Isfixedpremium=Isfixedpremium
    products.fixedpremium=fixedpremium
    products.Isbettingrange=Isbettingrange
    products.Isfixedrate=Isfixedrate
    products.fixedrate=fixedrate
    products.Isfixedsuminsured=Isfixedsuminsured

    products.Isfixedfee=Isfixedfee
    products.fixedsuminsured=fixedsuminsured
    products.fixedfee=fixedfee
    products.Isfixedpreventivemeasures=Isfixedpreventivemeasures
    products.fixedpreventivemeasures=fixedpreventivemeasures

    products.Ispolicywithoutpayment=Ispolicywithoutpayment
    products.Ismultipleagents=Ismultipleagents
    products.Isfranchisechange=Isfranchisechange
    products.Isforeigncurrency=Isforeigncurrency
    products.policyformatId=policyformatId
    products.typeofclaimsettlement=typeofclaimsettlement
    products.typeofrefund=typeofrefund
    products.typeofpayment=typeofpayment
    products.typeofpolice=typeofpolice
    products.minimumterminsurance=minimumterminsurance
    products.maxterminsurance=maxterminsurance

    products.tariff=tariff
    // products.agentlist=agentlist
    // products.Isagreement=Isagreement
    // products.limitofagreement=limitofagreement
    // products.tariffperclasses=tariffperclasses
    products.franchise=franchise
    const data = await products.save()
    res.status(200).json({
        message:`Products is changed`,
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

exports.deleteProducts = async(req,res,next)=>{
    const typeofrisksId= req.params.id
    try {
        const deleteddata = await Products.findById(typeofrisksId)
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
    const data=await Products.findByIdAndRemove(typeofrisksId)     
    res.status(200).json({
        message:'Products is deleted',
        data:data
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}

exports.getTariff = async(req,res,next)=>{
    const agentlist = req.body.agentlist
    const limitofagreement = req.body.limitofagreement
    const Isagreement = req.body.Isagreement
    const tariffperclasses = req.body.tariffperclasses


    console.log("XXXX");
    console.log(tariff);


}


