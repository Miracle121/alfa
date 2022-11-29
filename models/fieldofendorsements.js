const { Schema, model } = require('mongoose')
const fieldofendorsementsSchema = new Schema({
    typeofendorsements: {
        type: Schema.Types.ObjectId,
        ref: 'Typeofendorsements',
        required: true
    },
    filds: [
        {
            titleoffield: {
                type: String,
                required: true
            },
            nameoffield: {
                type: String,
                required: true
            },
            typeoffield: {
                type: String,
                required: true
            },
        }
    ],

    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
},

    { timestamps: true })

module.exports = model('Fieldofendorsements', fieldofendorsementsSchema)