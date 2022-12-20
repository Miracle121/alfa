const { Schema, model } = require('mongoose')
const transactionlogSchema = new Schema({

    typeofdistribute:[{
        type: Schema.Types.ObjectId,
        ref: 'Typeofdistribute',
        required: true
    }],
    //ID расчетного счета
    payment_order_number: {
        type: String,

        required: true   
    },
    //ID счета по дебету
    debt_account_ID: {
        type: String       
    },
    //ID объекта для субконто 1 счета по дебету
    debt_account_obj1_ID: {
        type: Date        
    },
    //ID объекта для субконто 2 счета по дебету
    debt_account_obj2_ID: {
        type: String
        
    },
    //ID объекта для субконто 3 счета по дебету
    debt_account_obj3_ID: {
        type: String
       
    },
    //ID объекта для субконто 4 счета по дебету
    debt_account_obj4_ID: {
        type: String
        
    },
    //ID объекта для субконто 5 счета по дебету
    debt_account_obj5_ID: {
        type: String
        
    },
    //ID счета по кредиту
    cred_account_ID: {
        type: String
        
    },
    //ID объекта для субконто 1 счета по кредиту
    cred_account_obj1_ID: {
        type: String
        
    },
    //ID объекта для субконто 2 счета по кредиту
    cred_account_obj2_ID: {
        type: String
        
    },
    //ID объекта для субконто 3 счета по кредиту
    cred_account_obj3_ID: {
        type: String
       
    },
    //ID объекта для субконто 4 счета по кредиту
    cred_account_obj4_ID: {
        type: String
        
    },
    //ID объекта для субконто 5 счета по кредиту
    cred_account_obj5_ID: {
        type: String
       
    },
    //сумма операции
    amount: {
        type: String
        
    },
    //дата проводки
    transaction_date: {
        type: Date
       
    },
    //описание
    description: {
        type: String
        
    },
    //дата фактического ввода операции
    input_date: {
        type: Date
        
    },    
    statusofAttachment: {
        type: String,
        enum: ['Новый', 'В процессе', 'Готов'],
        default: 'Новый'
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
},
    { timestamps: true })
module.exports = model('Transactionlog', transactionlogSchema)