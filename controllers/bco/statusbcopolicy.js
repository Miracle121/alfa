const Statusbcopolicy = require('../../models/bco/statusbcopolicy')


exports.getStatusbcopolicy= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Statusbcopolicy.find().countDocuments()
     const data = await Statusbcopolicy.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Status bco policy list`,
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

exports.getStatusbcopolicyById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Statusbcopolicy.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Status bco policy`,
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

exports.createStatusbcopolicy = async(req,res,next)=>{
    const name = req.body.name    
    const result = new Statusbcopolicy({
        name:name,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message:`Status bco policy`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updateStatusbcopolicy= async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name
    
    try {
    const result = await Statusbcopolicy.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
 
    const data =await result.save()  
    res.status(200).json({
        message:`Status bco policy`,
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

exports.deleteStatusbcopolicy = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Statusbcopolicy.findById(AgesId)
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
    const data=await Statusbcopolicy.findByIdAndRemove(AgesId)
    res.status(200).json({
        message:'Status bco policy',
        data:data   
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}