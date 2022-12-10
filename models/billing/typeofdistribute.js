const {Schema,model} = require('mongoose')
const typeofdistributeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    id_operations:{
        type:Number,
        required:true

    },
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })
module.exports = model('Typeofdistribute',typeofdistributeSchema)