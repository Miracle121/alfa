const {Schema,model} = require('mongoose')
const policySchema = new Schema({
    agreementsId:{
        type: Schema.Types.ObjectId,
        ref: 'Agreements',
        required:true
    },
    policynumber:{
        type:String,
        required:true
        },  
    formnumber:{
        type:String,
        required:true
        },  
    dateofissue:{
        type:Date,
        required:true
        },
    copyofdocuments:{
        type:String,
        required:true
    },     

    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},

{ timestamps:true })

module.exports = model('Policy',policySchema)