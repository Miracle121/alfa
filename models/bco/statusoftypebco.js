const {Schema,model} = require('mongoose')
const statusoftypebcoSchema = new Schema({
    name:{
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

module.exports = model('Statusoftypebco',statusoftypebcoSchema)