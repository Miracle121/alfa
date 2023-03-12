const StatusActs = require('../../models/bco/status_acts')


exports.getStatusActs= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await StatusActs.find().countDocuments()
     const data = await StatusActs.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Status of  Acts`,
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

exports.getStatusActsById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await StatusActs.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Status of  Acts`,
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

exports.createStatusActs = async(req,res,next)=>{
    const name = req.body.name    
    const result = new StatusActs({
        name:name,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message:`Status of  Acts`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updateStatusActs= async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name
    
    try {
    const result = await StatusActs.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
 
    const data =await result.save()  
    res.status(200).json({
        message:`Status of Acts`,
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

exports.deleteStatusActs = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await StatusActs.findById(AgesId)
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
    const data=await StatusActs.findByIdAndRemove(AgesId)
    res.status(200).json({
        message:'Status of  Acts',
        data:data   
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}