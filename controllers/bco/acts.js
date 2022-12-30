const Acts = require('../../models/bco/acts')
const  moment = require('moment')

exports.getActs = async (req, res, next) => {
    const page = req.query.page || 1
    const counts = 20   //req.query.count ||20
    let totalItems
    try {
        totalItems = await Acts.find()
            .countDocuments()
        const data = await Acts.find()            
            .populate('sender_branch_id', 'branchname')
            // .populate('sender_employee_id', 'name')
            .populate('receiver_branch_id', 'branchname')
            .populate('receiver_employee_id','email')
             .populate('policy_type_id', 'policy_type_name')
            .populate('policyId',['policy_series','policy_number'])         

            .skip((page - 1) * counts).limit(counts)
        res.status(200).json({
            message: `Type of Acts`,
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

exports.getActsById = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const result = await Acts.findById(AgesId)
            // .populate('sender_branch_id', 'name')
            // .populate('sender_employee_id', 'name')
            // .populate('statusofbcopolicy', 'name')
            // .populate('employee_id', 'name')
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: `Type of Acts`,
            data: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.createActs = async (req, res, next) => {
    const act_number = req.body.act_number
    const act_date =  moment(req.body.act_date ,"DD/MM/YYYY")   
    const sender_branch_id = req.body.sender_branch_id
    const sender_employee_id = req.body.sender_employee_id
    const receiver_branch_id = req.body.receiver_branch_id
    const receiver_employee_id = req.body.receiver_employee_id
    const policy_type_id = req.body.policy_type_id
    const policyId = req.body.policyId

    const result = new Acts({
        act_number: act_number,
        act_date: act_date,
        sender_branch_id: sender_branch_id,
        sender_employee_id: sender_employee_id,
        receiver_branch_id: receiver_branch_id,
        receiver_employee_id:receiver_employee_id,
        policy_type_id: policy_type_id,
        policyId: policyId,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message: `Type of Acts added`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updateActs = async (req, res, next) => {
    const AgesId = req.params.id

    const act_number = req.body.act_number
    const act_date = req.body.act_date
    const sender_branch_id = req.body.sender_branch_id
    const sender_employee_id = req.body.sender_employee_id
    const receiver_branch_id = req.body.receiver_branch_id
    const receiver_employee_id = req.body.receiver_employee_id
    const policy_type_id = req.body.policy_type_id
    const policyId = req.body.policyId

    try {
        const result = await Acts.findById(AgesId)
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        result.act_number = act_number
        result.act_date = act_date
        result.sender_branch_id = sender_branch_id
        result.sender_employee_id = sender_employee_id
        result.receiver_branch_id = receiver_branch_id
        result.receiver_employee_id = receiver_employee_id
        result.policy_type_id = policy_type_id
        result.policyId = policyId

        const data = await result.save()
        res.status(200).json({
            message: `Type of Acts changed`,
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

exports.deleteActs = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const deleteddata = await Acts.findById(AgesId)
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
        const data = await Acts.findByIdAndRemove(AgesId)
        res.status(200).json({
            message: 'Type of Acts is deleted',
            data: data
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}