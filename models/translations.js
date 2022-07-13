const {Schema,model} = require('mongoose')
const translationsSchema = new Schema({
    key:{
        type:String,
        required:true
    },
    uz:{
        type:String
    },
    ru:{
        type:String
    },
    eng:{
        type:String
    },   
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })

module.exports = model('Translations',translationsSchema)