const {Schema,model} = require('mongoose')

const regionSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    districts:[
        {
        type:Schema.Types.ObjectId,
        ref:'Districts'
        }
    ]
     
},
{ timestamps:true })

module.exports = model('Region',regionSchema)