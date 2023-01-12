const { Schema, model } = require('mongoose')
const bcoinpolicyblankSchema = new Schema({
    policy_type_id: {
        type: Schema.Types.ObjectId,
        ref: 'Typeofbco',
        required: true
    },
    bco_id: {
        type: Schema.Types.ObjectId,
        ref: 'Bco',
        required: true
    },
    policy_blank_number: {
        type: Schema.Types.ObjectId,
        ref: 'Policyblank',
        required: true
    },
    policy_qr_code: {
        type: String
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
},

    { timestamps: true })

module.exports = model('Bcoinpolicyblank', bcoinpolicyblankSchema)