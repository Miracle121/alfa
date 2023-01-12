const Bcoinpolicyblank = require('../../models/bco/bcoinpolicyblank')
const  moment = require('moment')

exports.getBcoinpolicyblank = async (req, res, next) => {
    const page = req.query.page || 1
    const counts = 20   
    let totalItems
    try {
        totalItems = await Bcoinpolicyblank.find()
            .countDocuments()
        const data = await Bcoinpolicyblank.find()
             .populate('policy_type_id','policy_type_name')            
             .populate({
                path:'bco_id',
                populate:[
                    {
                        path: 'policy_type_id',
                        select: 'policy_type_name'
                    },
                    {
                        path: 'policy_blank_number',
                        select: 'blank_number'
                    },
                    {
                        path: 'branch_id',
                        select: 'branchname'
                    },
                    {
                        path: 'employee_id',
                        select: 'name'
                    },
                    {
                        path: 'statusofbcopolicy',
                        select: 'name'
                    }
                ]
            
            
               })
              .populate('policy_blank_number', 'blank_number')
                  

            .skip((page - 1) * counts).limit(counts)
        res.status(200).json({
            message: `Type of bco `,
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

exports.getBcoinpolicyblankById = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const result = await Bcoinpolicyblank.findById(AgesId)
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

exports.createBcoinpolicyblank = async (req, res, next) => {
    const act_number = req.body.act_number
    const act_date =  moment(req.body.act_date ,"DD/MM/YYYY")   
    const sender_branch_id = req.body.sender_branch_id
    const sender_employee_id = req.body.sender_employee_id
    const receiver_branch_id = req.body.receiver_branch_id
    const receiver_employee_id = req.body.receiver_employee_id
    const policy_type_id = req.body.policy_type_id
    const policyId = req.body.policyId

    const result = new Bcoinpolicyblank({
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

exports.updateBcoinpolicyblank = async (req, res, next) => {
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
        const result = await Bcoinpolicyblank.findById(AgesId)
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

exports.deleteBcoinpolicyblank = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const deleteddata = await Bcoinpolicyblank.findById(AgesId)
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
        const data = await Bcoinpolicyblank.findByIdAndRemove(AgesId)
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