
const Transactionlog = require('../../models/billing/transactionlog')
const reader = require('xlsx')
const path = require('path')


exports.getTransactionlog = async (req, res, next) => {

    const page = req.query.page || 1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Transactionlog.find().countDocuments()
        const data = await Transactionlog.find().skip((page - 1) * counts).limit(counts)
        res.status(200).json({
            message: `Transaction list`,
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

exports.getTransactionlogById = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const result = await Transactionlog.findById(AgesId)
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: `Transaction list`,
            data: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.createTransactionlog = async (req, res, next) => {

    const typeofdistribute =req.body.typeofdistribute
    const payment_order_number=req.body.payment_order_number
    const debt_account_ID = req.body.debt_account_ID
    const debt_account_obj1_ID = req.body.debt_account_obj1_ID
    const debt_account_obj2_ID = req.body.debt_account_obj2_ID
    const debt_account_obj3_ID = req.body.debt_account_obj3_ID
    const debt_account_obj4_ID = req.body.debt_account_obj4_ID
    const debt_account_obj5_ID = req.body.debt_account_obj5_ID
    const cred_account_ID = req.body.cred_account_ID
    const cred_account_obj1_ID = req.body.cred_account_obj1_ID
    const cred_account_obj2_ID = req.body.cred_account_obj2_ID
    const cred_account_obj3_ID = req.body.cred_account_obj3_ID
    const cred_account_obj4_ID = req.body.cred_account_obj4_ID
    const cred_account_obj5_ID = req.body.cred_account_obj5_ID
    const amount = req.body.amount
    const transaction_date = req.body.transaction_date
    const description = req.body.description    
    const input_date = req.body.input_date

    const result = new Transactionlog({
        debt_account_ID: debt_account_ID,
        payment_order_number:payment_order_number,
        typeofdistribute:typeofdistribute,
        debt_account_obj1_ID: debt_account_obj1_ID,
        debt_account_obj2_ID: debt_account_obj2_ID,
        debt_account_obj3_ID: debt_account_obj3_ID,
        debt_account_obj4_ID: debt_account_obj4_ID,
        debt_account_obj5_ID: debt_account_obj5_ID,
        cred_account_ID: cred_account_ID,
        cred_account_obj1_ID: cred_account_obj1_ID,
        cred_account_obj2_ID: cred_account_obj2_ID,
        cred_account_obj3_ID: cred_account_obj3_ID,
        cred_account_obj4_ID: cred_account_obj4_ID,
        cred_account_obj5_ID: cred_account_obj5_ID,
        amount: amount,
        transaction_date:transaction_date,
        description:description,
        input_date:input_date,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message: `Accountroles added`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updateTransactionlog = async (req, res, next) => {
    const AgesId = req.params.id
    const account_ID = req.body.account_ID
    const payment_order_number = req.body.payment_order_number
    const payment_order_date = req.body.payment_order_date
    const payment_amount = req.body.payment_amount
    const payment_details = req.body.payment_details
    const sender_name = req.body.sender_name
    const sender_taxpayer_number = req.body.sender_taxpayer_number
    const sender_bank_account = req.body.sender_bank_account
    const sender_bank_code = req.body.sender_bank_code
    const sender_bank_taxpayer_number = req.body.sender_bank_taxpayer_number
    const recipient_bank_account = req.body.recipient_bank_account
    const recipient_bank_code = req.body.recipient_bank_code
    const recipient_bank_taxpayer_number = req.body.recipient_bank_taxpayer_number
    try {
        const result = await Transactionlog.findById(AgesId)
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        result.payment_order_number = payment_order_number
        result.payment_order_date = payment_order_date
        result.payment_amount = payment_amount
        result.payment_details = payment_details
        result.sender_name = sender_name
        result.sender_taxpayer_number = sender_taxpayer_number
        result.sender_bank_account = sender_bank_account
        result.sender_bank_code = sender_bank_code
        result.sender_bank_taxpayer_number = sender_bank_taxpayer_number
        result.recipient_bank_account = recipient_bank_account
        result.recipient_bank_code = recipient_bank_code
        result.recipient_bank_taxpayer_number = recipient_bank_taxpayer_number
        const data = await result.save()
        res.status(200).json({
            message: `Transaction changed`,
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

exports.deleteTransactionlog = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const deleteddata = await Transactionlog.findById(AgesId)
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
        const data = await Transactionlog.findByIdAndRemove(AgesId)
        res.status(200).json({
            message: 'Transaction is deleted',
            data: data
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.transaction_date = async (req, res, next) => {
    console.log("keldi");

    const transactionlog_id = req.params.id
    const typeofdistribute =req.body.typeofdistribute
    const debt_account_ID = req.body.debt_account_ID
    const debt_account_obj1_ID = req.body.debt_account_obj1_ID
    const debt_account_obj2_ID = req.body.debt_account_obj2_ID
    const debt_account_obj3_ID = req.body.debt_account_obj3_ID
    const debt_account_obj4_ID = req.body.debt_account_obj4_ID
    const debt_account_obj5_ID = req.body.debt_account_obj5_ID
    const cred_account_ID = req.body.cred_account_ID
    const cred_account_obj1_ID = req.body.cred_account_obj1_ID
    const cred_account_obj2_ID = req.body.cred_account_obj2_ID
    const cred_account_obj3_ID = req.body.cred_account_obj3_ID
    const cred_account_obj4_ID = req.body.cred_account_obj4_ID
    const cred_account_obj5_ID = req.body.cred_account_obj5_ID
    const amount = req.body.amount
    const transaction_date = req.body.transaction_date
    const description = req.body.description    
    const input_date = req.body.input_date

    
    try {
        const transactionlog = await Transactionlog.findById(transactionlog_id) 
        console.log(transactionlog);
        
    } catch (err) {
        next(err)
        
    }



     
   

}