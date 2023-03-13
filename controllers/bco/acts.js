const Acts = require('../../models/bco/acts')
const Warehouse = require('../../models/bco/warehouse')
const Typeofbco = require('../../models/bco/typeofbco')
const Bco = require('../../models/bco/bco')
const Policyblank = require('../../models/bco/policyblank')
const moment = require('moment')

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
            // .populate('receiver_employee_id','email')
            .populate('statusofact', 'name')

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
    const act_date = moment(req.body.act_date, "DD/MM/YYYY")
    const sender_branch_id = req.body.sender_branch_id
    const sender_employee_id = req.body.sender_employee_id
    const receiver_branch_id = req.body.receiver_branch_id
    const receiver_employee_id = req.body.receiver_employee_id
    const bco_data = req.body.bco_data
    const statusofact = req.body.statusofact

    const bco = await gettingNumberOfDigits(bco_data)
    const result = new Acts({
        act_number: act_number,
        act_date: act_date,
        sender_branch_id: sender_branch_id,
        sender_employee_id: sender_employee_id,
        receiver_branch_id: receiver_branch_id,
        receiver_employee_id: receiver_employee_id,
        bco_data: bco,
       
        statusofact: statusofact,
        creatorId: req.userId
    })

    const results = await result.save()
    const bco_data_from_func = await gettingNumberOfDigitsWithActs(bco_data, results._id, req.userId)
    const bco_all = await Bco.insertMany(bco_data_from_func)
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
exports.cheakBlanks = async (req, res, next) => {
    let blank = []
    let blanks = {}
    const policy_type_id = req.body.policy_type_id
    const policy_blank_number_from = req.body.policy_blank_number_from
    const policy_blank_number_to = req.body.policy_blank_number_to
    const policy_blank = await Policyblank.find({ policy_type_id: policy_type_id })

    policy_blank.forEach(b => {
        if (((b.blank_number >= policy_blank_number_from) && (b.blank_number <= policy_blank_number_to) && (b.Is_usedblank === false))) {
            blank.push(b.blank_number)

        }
    })
    const typeofbco = await Typeofbco.findById(policy_type_id) //.select('__id','policy_type_name')
    

    blanks = {
        policy_type_id: typeofbco,
        policy_blank_number_from: policy_blank_number_from,
        policy_blank_number_to: policy_blank_number_to,
        blank_counts: blank.length,
        blanks: blank
    }
    // console.log(blanks);
    res.status(200).json({
        message: `Results of checking blanks`,
        data: blanks,
        creatorId: req.userId,
    })
}
const gettingNumberOfDigits = async (bco_data) => {
    let blank = []
    let blanks = {}
    let bl = []
    for (let i = 0; i < bco_data.length; i++) {
        const policy_type_id = bco_data[i].policy_type_id;
        const policy_blank_number_from = bco_data[i].policy_blank_number_from;
        const policy_blank_number_to = bco_data[i].policy_blank_number_to;
        const policy_blank = await Policyblank.find({ policy_type_id: policy_type_id })
        policy_blank.forEach(b => {
            if (((b.blank_number >= policy_blank_number_from) && (b.blank_number <= policy_blank_number_to) && (b.Is_usedblank === false))) {
                blank.push(b.blank_number)
            }
        })
        // console.log(blank);
        blanks = {

            policy_type_id: policy_type_id,
            policy_blank_number_from: policy_blank_number_from,
            policy_blank_number_to: policy_blank_number_to,
            blank_number: blank,
            blank_counts: blank.length
        }
        // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        bl.push(blanks)
        blank = []
    }
    // console.log(bl); 
    return bl
}


const gettingNumberOfDigitsWithActs = async (bco_data, act_id, creatorId) => {
    let blank = []
    let blanks = {}
    let blanks_test = {}
    let bl = []
    let blank_id = []
    for (let i = 0; i < bco_data.length; i++) {
        const policy_type_id = bco_data[i].policy_type_id;
        const policy_blank_number_from = bco_data[i].policy_blank_number_from;
        const policy_blank_number_to = bco_data[i].policy_blank_number_to;
        const policy_blank = await Policyblank.find({ policy_type_id: policy_type_id })
        policy_blank.forEach(b => {
            if (((b.blank_number >= policy_blank_number_from) && (b.blank_number <= policy_blank_number_to) && (b.Is_usedblank === false))) {
                blanks_test = {
                    _id: b._id,
                    blank_number: b.blank_number,
                    branch_id:b.branch_id,
                    warehous_id:b.warehous_id,
                    Is_usedblank:b.Is_usedblank,
                    Is_given:b.Is_given
                   
                }
                blank.push(blanks_test)
                blank_id.push(b._id)
            }
        })
      
        blanks = {
            act_id: act_id,
            policy_type_id: policy_type_id,
            policy_blank_number_from: policy_blank_number_from,
            policy_blank_number_to: policy_blank_number_to,
            blank_number: blank,
            blank_counts: blank.length,
            status_bco:"6409a29a1ffcc491f7f4c2e5",
            creatorId: creatorId
        }

        bl.push(blanks)
        blank = []
    }
   
    const updateblanks = await Policyblank.updateMany(
        {_id:blank_id},
        {$set:{"Is_given":true}})
    
    return bl
}