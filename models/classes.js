const {Schema,model} = require('mongoose')


const classesofproductSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    color:{
        type:String,
    },   
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })

module.exports = model('Classesofproduct',classesofproductSchema)