const Actstatus = require('../../models/bco/actstatus')


exports.getActstatus= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Actstatus.find().countDocuments()
     const data = await Actstatus.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Act status`,
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

exports.getActstatusById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Actstatus.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Act status`,
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

exports.createActstatus = async(req,res,next)=>{
    const name = req.body.name    
    const result = new Actstatus({
        name:name,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message:`Act status`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updateActstatus= async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name
    
    try {
    const result = await Actstatus.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
 
    const data =await result.save()  
    res.status(200).json({
        message:`Act status`,
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

exports.deleteActstatus = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Actstatus.findById(AgesId)
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
    const data=await Actstatus.findByIdAndRemove(AgesId)
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