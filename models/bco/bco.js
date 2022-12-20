const { Schema, model } = require('mongoose')
const bcoSchema = new Schema({

    policy_type_id: {
        type: Schema.Types.ObjectId,
        ref: 'Typeofbco',
        required: true
    },
    policy_series: {
        type: String,
        // required: true
    },
    policy_number:{
        type: Number,
        required: true
    },
    policy_qr_code:{
        type: String
    },
    branch_id:{
        type: Schema.Types.ObjectId,
        ref: 'Breanches',
        required: true
    },
    employee_id:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        // required: true
    },    
    statusofbcopolicy:[{
        type: Schema.Types.ObjectId,
        ref: 'Statusofpolicy',
        required: true
    }],
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
},

    { timestamps: true })

module.exports = model('Bco', bcoSchema)