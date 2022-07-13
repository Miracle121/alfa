const {Schema,model} = require('mongoose')
const typeoffranchisechema = new Schema({
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

module.exports = model('Typeoffranchise',typeoffranchisechema)