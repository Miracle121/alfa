const { Schema, model } = require('mongoose')
const policyblankSchema = new Schema({
    warehouse_id:{
        type: Schema.Types.ObjectId,
        ref: 'warehouse',
        required: true
    },
    policy_type_id: {
        type: Schema.Types.ObjectId,
        ref: 'Typeofbco'
    },
   
    blank_number: {
        type: String
    },
    Is_usedblank: {
        type: Boolean
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
},

    { timestamps: true })

module.exports = model('Policyblank', policyblankSchema)