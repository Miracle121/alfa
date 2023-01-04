const { Schema, model } = require('mongoose')
const typeofbcoSchema = new Schema({
    policy_type_name: {
        type: String,
        required: true
    },
    policy_size_id: {
        type: Schema.Types.ObjectId,
        ref: 'Policyformats',
        required: true
    },
    language: [{
        type: Schema.Types.ObjectId,
        ref: 'Languagepolicy',
        required: true
    }],

    policy_series: {
        type: String,
        required: true
    },
    policy_number_of_digits_start: {
        type: Number,
        required: true
    },
    policy_number_of_digits_end: {
        type: Number,
        required: true
    },
    policy_count:{
        type: Number
    },
    statusofpolicy:{
        type: Schema.Types.ObjectId,
        ref: 'Statusofpolicy',
        required: true
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
},

    { timestamps: true })

module.exports = model('Typeofbco', typeofbcoSchema)