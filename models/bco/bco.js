const { Schema, model } = require('mongoose')
const bcoSchema = new Schema({

    policy_type_id: {
        type: Schema.Types.ObjectId,
        ref: 'Typeofbco',
        required: true
    },   
    policy_blank_number:[{
        type: Schema.Types.ObjectId,
        ref: 'Policyblank',
        required: true
    }],
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
        ref: 'Statusbcopolicy',
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