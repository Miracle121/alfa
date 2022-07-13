const {Schema,model} = require('mongoose')

const objectsSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    typobjectsId:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofobjects',
        required: true
    },
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })

module.exports = model('Objects',objectsSchema)