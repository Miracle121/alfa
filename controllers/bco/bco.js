const Bco = require('../../models/bco/bco')


exports.getBco = async (req, res, next) => {
    const page = req.query.page || 1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Bco.find()
            .countDocuments()
        const data = await Bco.find()
            .populate('policy_type_id', 'policy_type_name')
            .populate('branch_id', 'branchname')
            .populate('statusofbcopolicy', 'name')
            .populate('employee_id', 'name')

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
    // const policy_series = req.body.policy_series
    const policy_number = req.body.policy_number
    const policy_qr_code = req.body.policy_qr_code
    const branch_id = req.body.branch_id
    const employee_id = req.body.employee_id
    const statusofbcopolicy = req.body.statusofbcopolicy

    const result = new Bco({
        policy_type_id: policy_type_id,
        // policy_series: policy_series,
        policy_number: policy_number,
        policy_qr_code: policy_qr_code,
        branch_id: branch_id,
        employee_id: employee_id,
        statusofbcopolicy: statusofbcopolicy,
        creatorId: req.userId
    })
    const results = await result.save()
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
    const policy_number = req.body.policy_number
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
        result.policy_number = policy_number
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