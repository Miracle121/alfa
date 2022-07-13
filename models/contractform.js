const {Schema,model} = require('mongoose')
const contractformSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    url:{
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

module.exports = model('Contractform',contractformSchema)