const {Schema,model} = require('mongoose')
const typeofdistributeSchema = new Schema({
    nameofoperations:{
        type:String,
        required:true
    },
    // accountname:{
    //     type:String
    //     // required:true
    // },
    debt_account_ID:{
        type:Number,
        // required:true

    },
    cred_account_ID:{
        type:Number,
        // required:true

    },
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })
module.exports = model('Typeofdistribute',typeofdistributeSchema)