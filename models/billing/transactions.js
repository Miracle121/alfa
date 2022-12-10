const { Schema, model } = require('mongoose')
const transactionSchema = new Schema({

    //ID расчетного счета
    account_ID: {
        type: String
        // required: true
    },
    //номер платежного поручения
    payment_order_number: {
        type: String,
        required: true
    },
    //дата платежного поручения
    payment_order_date: {
        type: Date,
        required: true
    },
    //сумма поступления
    payment_amount: {
        type: String,
        required: true
    },

    //детали платежа
    payment_details: {
        type: String,
        required: true
    },
    //наименование отправителя

    sender_name: {
        type: String,
        required: true
    },

    //ИНН отправителя
    sender_taxpayer_number: {
        type: String,
        required: true
    },

    //р/с отправителя
    sender_bank_account: {
        type: String,
        required: true
    },

    //МФО банка отправителя
    sender_bank_code: {
        type: String,
        required: true
    },

    //ИНН банка отправителя
    sender_bank_taxpayer_number: {
        type: String,
        required: true
    },
    //р/с получателя

    recipient_bank_account: {
        type: String,
        required: true
    },
    //МФО банка получателя
    recipient_bank_code: {
        type: String,
        required: true
    },
    //ИНН банка получателя
    recipient_bank_taxpayer_number: {
        type: String,
        required: true
    },
    statusofAttachment:{
        type:String,
        enum : ['Новый','В процессе','Готов'],
        default: 'Новый'
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
},
    { timestamps: true })
module.exports = model('Transactions', transactionSchema)