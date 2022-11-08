const { Schema, model } = require('mongoose')
const policySchema = new Schema({

    agreementsId: {
        type: Schema.Types.ObjectId,
        ref: 'Agreements',
        required: true
    },
    policynumber: {
        type: String,
        required: true
    },

    typeofpoliceId: {
        type: Schema.Types.ObjectId,
        ref: 'Typeofpolice',
        required: true
    },

    formnumber: {
        type: String,
        required: true
    },

    dateofissue: {
        type: Date,
        required: true
    },
    dateofend: {
        type: Date,
        required: true
    },
    dateofissueunix: {
        type: Number,
        
    },
    dateofendunix: {
        type: Number,
    },
    copyofdocuments: {
        type: String,
        // required: true
    },
    riskId: [{
        riskgroup: {
            type: Schema.Types.ObjectId,
            ref: 'Typeofrisks',
            required: true
        },
        risk: {
            type: Schema.Types.ObjectId,
            ref: 'Risks',
            required: true
        },
        classeId: {
            type: Schema.Types.ObjectId,
            ref: 'Classesofproduct',
            required: true
        },
        startdate: {
            type: Date
        },
        enddate: {
            type: Date
        },
        insurancepremium: {
            type: Number
        },
        insurancerate: {
            type: Number
        },
        suminsured: {
            type: Number
        }
    }],
    objectofinsurance: [{
        typeofobjects: {
            type: Schema.Types.ObjectId,
            ref: 'Typeofobjects',
            required: true
        },
        objects: {
            type: Schema.Types.ObjectId,
            ref: 'Objects',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        regionId: {
            type: Schema.Types.ObjectId,
            ref: 'Region',
            required: true
        },
        districtsId: {
            type: Schema.Types.ObjectId,
            ref: 'Districts',
            required: true
        }
    }],
    statusofpolicy: {
        type: Schema.Types.ObjectId,
        ref: 'Statusofpolicy',
        required: true

    },
    statusofpayment: {
        type: Schema.Types.ObjectId,
        ref: 'Statusofpayment',
        required: true
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
},

    { timestamps: true })

module.exports = model('Policy', policySchema)