const Bco = require('../../models/bco/bco')
const Bcoinpolicyblank = require('../../models/bco/bcoinpolicyblank')
const Policyblank =require('../../models/bco/policyblank')

exports.getBco = async (req, res, next) => {
    const page = req.query.page || 1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Bco.find()
            .countDocuments()
        const data = await Bco.find()
            .populate('policy_type_id', 'policy_type_name')
            .populate('act_id', 'act_number')
            // .populate('statusofbcopolicy', 'name')
            // .populate('employee_id', 'name')
            // .populate('policy_blank_number', 'blank_number')

            .skip((page - 1) * counts).limit(counts)
        res.status(200).json({
            message: `Type of BCO`,
            data: data,
            totalItems: totalItems
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getBcoById = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const result = await Bco.findById(AgesId)
            .populate('policy_type_id', 'policy_type_name')
            .populate('branch_id', 'name')
            .populate('statusofbcopolicy', 'name')
            .populate('employee_id', 'name')
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: `Type of BCO`,
            data: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.createBco = async (req, res, next) => {

    const policy_type_id = req.body.policy_type_id
    const policy_blank_number = req.body.policy_blank_number
    const branch_id = req.body.branch_id
    const employee_id = req.body.employee_id
    const statusofbcopolicy = req.body.statusofbcopolicy    
    const result = new Bco({
        policy_type_id: policy_type_id,       
        policy_blank_number: policy_blank_number,
        branch_id: branch_id,
        employee_id: employee_id,
        statusofbcopolicy: statusofbcopolicy,
        creatorId: req.userId
    })
    const results = await result.save()
    const bcodata = await polcybalnkinbco(policy_type_id,policy_blank_number,result._id,req.userId)
    res.status(200).json({
        message: `Type of BCO added`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updateBco = async (req, res, next) => {
    const AgesId = req.params.id
    const policy_type_id = req.body.policy_type_id
    const policy_series = req.body.policy_series
    const policy_blank_number = req.body.policy_blank_number
    const policy_qr_code = req.body.policy_qr_code
    const branch_id = req.body.branch_id
    const employee_id = req.body.employee_id
    const statusofbcopolicy = req.body.statusofbcopolicy
    try {
        const result = await Bco.findById(AgesId)
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        result.policy_type_id = policy_type_id
        result.policy_series = policy_series
        result.policy_blank_number = policy_blank_number
        result.policy_qr_code = policy_qr_code
        result.branch_id = branch_id
        result.employee_id = employee_id
        result.statusofbcopolicy = statusofbcopolicy
        const data = await result.save()
        res.status(200).json({
            message: `Type of BCO changed`,
            data: data
        })
    } catch (err) {
        if (!err.statusCode) {
            const error = new Error('Intenall error11111')
            error.statusCode = 500
            throw error
        }
        next(err)
    }
}

exports.deleteBco = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const deleteddata = await Bco.findById(AgesId)
        if (!deleteddata) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        if (deleteddata.creatorId.toString() !== req.userId) {
            const error = new Error('bu userni ochirishga imkoni yoq')
            error.statusCode = 403
            throw error
        }
        const data = await Bco.findByIdAndRemove(AgesId)
        res.status(200).json({
            message: 'Type of BCO is deleted',
            data: data
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

const polcybalnkinbco = async (policy_type_id, policy_blank_number, bco_id,creatorId)=>{

    const number = policy_blank_number.length  
   
    const data_bco=[]
    try {
        for (let i = 0; i < number; i++) {
            element = new Object()
           element = {
               policy_type_id:policy_type_id,
               bco_id:bco_id,
               policy_blank_number:policy_blank_number[i],
               policy_qr_code:"xxxxx"+i,
               creatorId:creatorId
           }
           data_bco.push(element)        
       }       
       const policy_blank_number_two=await Bcoinpolicyblank.insertMany(data_bco)       
       const updatepolicy_blank = await Policyblank.updateMany({
           _id:{
               $in:policy_blank_number
           }},
           {$set:{
               Is_usedblank:true
           }})
        
    } catch (err) {
        next(err)
        
    }
   

       



}