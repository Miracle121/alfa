
const Transaction = require('../../models/billing/transactions')
exports.getTransaction= async(req,res,next)=>{
 
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Transaction.find().countDocuments()
     const data = await Transaction.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Transaction list`,
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

exports.getTransactionById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Transaction.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Transaction list`,
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

exports.createTransaction = async(req,res,next)=>{

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
    const result = new Transaction({
        account_ID:account_ID,
        payment_order_number:payment_order_number,
        payment_order_date:payment_order_date,
        payment_amount:payment_amount,
        payment_details:payment_details,
        sender_name:sender_name,
        sender_taxpayer_number:sender_taxpayer_number,
        sender_bank_account:sender_bank_account,
        sender_bank_code:sender_bank_code,
        sender_bank_taxpayer_number:sender_bank_taxpayer_number,
        recipient_bank_account:recipient_bank_account,
        recipient_bank_code:recipient_bank_code,
        recipient_bank_taxpayer_number:recipient_bank_taxpayer_number,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message:`Accountroles added`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updateTransaction= async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name
    
    try {
    const result = await Transaction.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
 
    const data =await result.save()  
    res.status(200).json({
        message:`Transaction changed`,
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

exports.deleteTransaction = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Transaction.findById(AgesId)
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
    const data=await Transaction.findByIdAndRemove(AgesId)
    res.status(200).json({
        message:'Transaction is deleted',
        data:data   
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}