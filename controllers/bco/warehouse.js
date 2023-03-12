const Warehouse = require('../../models/bco/warehouse')
const Typeofbco = require('../../models/bco/typeofbco')
const Policyblank = require('../../models/bco/policyblank')



exports.getWarehouse = async (req, res, next) => {
    const page = req.query.page || 1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Warehouse.find()
            .countDocuments()
        const data = await Warehouse.find()
            .populate('statusofpolicy', 'name')
            .populate('branch_id','branchname')
            .populate({
                path: 'policy_type_id',
                populate: [
                    {
                        path: 'policy_size_id',
                        select: 'name'
                    },
                    {
                        path: 'language',
                        select: 'name'

                    }
                ]
            })
            .skip((page - 1) * counts).limit(counts)
        res.status(200).json({
            message: `Warehouse Insurance`,
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

exports.getWarehouseById = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const result = await Warehouse.findById(AgesId)
        .populate('statusofpolicy', 'name')
        .populate('branch_id','branchname')
        .populate({
            path: 'policy_type_id',
            populate: [
                {
                    path: 'policy_size_id',
                    select: 'name'
                },
                {
                    path: 'language',
                    select: 'name'

                }
            ]
        })
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: `Warehouse Insurance`,
            data: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.createWarehouse = async (req, res, next) => {

    const policy_type_id = req.body.policy_type_id
    const policy_number_of_digits_start = req.body.policy_number_of_digits_start
    const policy_number_of_digits_end = req.body.policy_number_of_digits_end
    const policy_count = Math.abs(policy_number_of_digits_start - policy_number_of_digits_end) + 1
    const statusofpolicy = "63a1f3f370bcecacc39fc2ed"
    const branch_id = "62dfd0f1a098c2cd901d7f6a"
    try {
        const result = new Warehouse({
            policy_type_id: policy_type_id,
            policy_number_of_digits_start: policy_number_of_digits_start,
            policy_number_of_digits_end: policy_number_of_digits_end,
            policy_count: policy_count,
            statusofpolicy: statusofpolicy,
            branch_id: branch_id,
            creatorId: req.userId
        })
        const results = await result.save()
        const status_blank = "63a1f3f370bcecacc39fc2ed"
        const policy_blank_number = await gettingNumberOfDigits(
            results._id,
            policy_type_id,
            policy_number_of_digits_start,
            policy_number_of_digits_end,
            branch_id,
            status_blank,
            req.userId)
        const policyblank = await Policyblank.insertMany(policy_blank_number)
        res.status(200).json({
            message: `Creat new policy blank`,
            data: results,
            blank: policyblank,
            creatorId: req.userId,
        })

    } catch (error) {

    }
}

exports.updateWarehouse = async (req, res, next) => {
    const AgesId = req.params.id
    const policy_type_id = req.body.policy_type_id
    const policy_number_of_digits_start = req.body.policy_number_of_digits_start
    const policy_number_of_digits_end = req.body.policy_number_of_digits_end
    const policy_count = Math.abs(policy_number_of_digits_start - policy_number_of_digits_end)
    const statusofpolicy = req.body.statusofpolicy
    try {
        const result = await Warehouse.findById(AgesId)
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        result.policy_type_id = policy_type_id
        result.policy_number_of_digits_start = policy_number_of_digits_start
        result.policy_number_of_digits_end = policy_number_of_digits_end
        result.policy_count = policy_count
        result.statusofpolicy = statusofpolicy

        const data = await result.save()
        res.status(200).json({
            message: `Update policy blank`,
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

exports.deleteWarehouse = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const deleteddata = await Warehouse.findById(AgesId)
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
        const data = await Warehouse.findByIdAndRemove(AgesId)
        res.status(200).json({
            message: 'Policy blank is deleted',
            data: data
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getPolicyblanknumberByTypeId = async (req, res, next) => {

    const AgesId = req.params.id
    try {
        const result = await Warehouse.find({ policy_type_id: AgesId })
            .populate('policy_type_id', 'name')
            .populate('statusofpolicy', 'name')
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: `Warehouse Insurance`,
            data: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }

}

const gettingNumberOfDigits = async (
    warehouse_id,
    policy_type_id,
    policy_number_of_digits_start,
    policy_number_of_digits_end,
    branch_id,
    status_blank,
    creatorId) => {
    const typebco = await Typeofbco.findById(policy_type_id)
    const policynumerdigits = typebco.policy_number_of_digits
    const numerofpolicy_blank = []
    for (let i = policy_number_of_digits_start; i < (policy_number_of_digits_end + 1); i++) {
        testobject = new Object()
        testobject = {
            warehous_id: warehouse_id,
            branch_id: branch_id,
            policy_type_id: policy_type_id,
            blank_number: await addzero(policynumerdigits, i),
            Is_usedblank: false,
            status_blank: status_blank,
            Is_given: false,
            creatorId: creatorId
        }
        numerofpolicy_blank.push(testobject)
    }
    const policy_blank_number = numerofpolicy_blank

    return policy_blank_number
}

const addzero = async (policy_count, numer) => {
    const numerlenth = numer.toString()
    let zeros_str = "0"
    const countrepeat = policy_count - numerlenth.length
    const repeatresults = zeros_str.repeat(countrepeat)
    const zeros_rep = repeatresults + numer
    return zeros_rep
}

exports.getPolicyblankByPolicytypeId = async (req, res, next) => {

}