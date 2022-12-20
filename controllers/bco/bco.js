const Bco = require('../../models/bco/bco')


exports.getBco= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Bco.find()   
     .countDocuments()
     const data = await Bco.find()
     .populate('policy_type_name','name')
     .populate('policy_size_id','name')
     .populate('language','name')
     .populate('statusofpolicy','name')
     .skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Type of BCO`,
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

exports.getBcoById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Bco.findById(AgesId)
        .populate('policy_type_name','name')
        .populate('policy_size_id','name')
        .populate('language','name')
        .populate('statusofpolicy','name')
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Type of BCO`,
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

exports.createBco = async(req,res,next)=>{
    const policy_type_name = req.body.policy_type_name   
    const policy_size_id = req.body.policy_size_id
    const language = req.body.language
    const policy_series= req.body.policy_series
    const policy_number_of_digits= req.body.policy_number_of_digits
    const statusofpolicy = req.body.statusofpolicy
    const result = new Bco({
        policy_type_name:policy_type_name,
        policy_size_id:policy_size_id,
        language:language,
        policy_series:policy_series,
        policy_number_of_digits:policy_number_of_digits,
        statusofpolicy:statusofpolicy,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message:`Type of BCO added`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updateBco= async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name
    
    try {
    const result = await Bco.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
 
    const data =await result.save()  
    res.status(200).json({
        message:`Type of BCO changed`,
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

exports.deleteBco = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Bco.findById(AgesId)
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
    const data=await Bco.findByIdAndRemove(AgesId)
    res.status(200).json({
        message:'Type of BCO is deleted',
        data:data   
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}