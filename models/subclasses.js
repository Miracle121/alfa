const {Schema,model} = require('mongoose')


const subclassesofproductSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    classId:{
        type: Schema.Types.ObjectId,
        ref: 'Classesofproduct',
        required: true
    },
   
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })

module.exports = model('Subclassesofproduct',subclassesofproductSchema)